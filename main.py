from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import os
import json
import PyPDF2
import docx2txt
from typing import List, Dict, Any
import io

load_dotenv()

app = FastAPI(title="Legalynx AI Contract Analysis API")

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://www.legalynx.ai"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class ContractRequest(BaseModel):
    contract_text: str
    analysis_type: str = "full"  # full, risks, clauses, compliance

class ContractAnalysis(BaseModel):
    id: str
    title: str
    clauses: List[str]
    risks: List[Dict[str, Any]]
    compliance_issues: List[Dict[str, Any]]
    summary: str
    risk_score: int
    recommendations: List[str]

class BulkAnalysisRequest(BaseModel):
    contracts: List[Dict[str, str]]  # [{"title": "Contract 1", "text": "..."}]

# Helper functions
def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        text = docx2txt.process(io.BytesIO(file_content))
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading DOCX: {str(e)}")

def get_llm_chain(analysis_type: str = "full"):
    """Get LangChain LLM with appropriate prompt"""
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured.")
    
    llm = OpenAI(
        openai_api_key=openai_api_key,
        temperature=0,
        model_name="gpt-4",
    )

    if analysis_type == "full":
        prompt_template = """
        You are an expert legal AI assistant specializing in contract analysis. Analyze the following contract and provide a comprehensive analysis.

        Contract Text:
        {contract}

        Provide your analysis in the following JSON format:
        {{
            "clauses": [
                "List of key clauses identified in the contract"
            ],
            "risks": [
                {{
                    "risk": "Description of the risk",
                    "severity": "High/Medium/Low",
                    "location": "Where in the contract this risk appears",
                    "recommendation": "How to mitigate this risk"
                }}
            ],
            "compliance_issues": [
                {{
                    "issue": "Description of compliance issue",
                    "regulation": "Relevant regulation or standard",
                    "severity": "High/Medium/Low",
                    "recommendation": "How to address this issue"
                }}
            ],
            "summary": "Brief summary of the contract's main terms and purpose",
            "risk_score": 75,
            "recommendations": [
                "List of general recommendations for improving the contract"
            ]
        }}

        Be thorough and precise in your analysis. Focus on identifying potential legal risks, compliance issues, and areas for improvement.
        """
    elif analysis_type == "risks":
        prompt_template = """
        You are an expert legal AI assistant. Focus specifically on identifying risks in this contract.

        Contract Text:
        {contract}

        Provide your risk analysis in JSON format:
        {{
            "risks": [
                {{
                    "risk": "Description of the risk",
                    "severity": "High/Medium/Low",
                    "location": "Where in the contract this risk appears",
                    "recommendation": "How to mitigate this risk"
                }}
            ],
            "risk_score": 75
        }}
        """
    elif analysis_type == "clauses":
        prompt_template = """
        You are an expert legal AI assistant. Extract and categorize all important clauses from this contract.

        Contract Text:
        {contract}

        Provide your clause analysis in JSON format:
        {{
            "clauses": [
                "List of key clauses with their purposes and implications"
            ]
        }}
        """
    else:  # compliance
        prompt_template = """
        You are an expert legal AI assistant. Focus on compliance issues in this contract.

        Contract Text:
        {contract}

        Provide your compliance analysis in JSON format:
        {{
            "compliance_issues": [
                {{
                    "issue": "Description of compliance issue",
                    "regulation": "Relevant regulation or standard",
                    "severity": "High/Medium/Low",
                    "recommendation": "How to address this issue"
                }}
            ]
        }}
        """

    prompt = PromptTemplate(
        input_variables=["contract"],
        template=prompt_template
    )

    return LLMChain(llm=llm, prompt=prompt)

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Legalynx AI Contract Analysis API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "contract-analysis-api"}

@app.post("/analyze")
async def analyze_contract(request: ContractRequest):
    """Analyze a contract with specified analysis type"""
    if not request.contract_text:
        raise HTTPException(status_code=400, detail="No contract text provided.")
    
    try:
        chain = get_llm_chain(request.analysis_type)
        result = chain.run(contract=request.contract_text)
        
        # Parse the JSON result
        try:
            analysis_result = json.loads(result)
        except json.JSONDecodeError:
            # If JSON parsing fails, return raw result
            analysis_result = {"raw_result": result}
        
        return {
            "success": True,
            "analysis_type": request.analysis_type,
            "result": analysis_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    """Upload and analyze a contract file (PDF or DOCX)"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Check file type
    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Extract text based on file type
        if file.content_type == "application/pdf":
            contract_text = extract_text_from_pdf(file_content)
        else:  # DOCX
            contract_text = extract_text_from_docx(file_content)
        
        if not contract_text.strip():
            raise HTTPException(status_code=400, detail="No text could be extracted from the file")
        
        # Analyze the contract
        chain = get_llm_chain("full")
        result = chain.run(contract=contract_text)
        
        try:
            analysis_result = json.loads(result)
        except json.JSONDecodeError:
            analysis_result = {"raw_result": result}
        
        return {
            "success": True,
            "filename": file.filename,
            "extracted_text_length": len(contract_text),
            "result": analysis_result
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing failed: {str(e)}")

@app.post("/bulk-analyze")
async def bulk_analyze_contracts(request: BulkAnalysisRequest):
    """Analyze multiple contracts in bulk"""
    if not request.contracts:
        raise HTTPException(status_code=400, detail="No contracts provided for analysis")
    
    results = []
    chain = get_llm_chain("full")
    
    for i, contract in enumerate(request.contracts):
        try:
            result = chain.run(contract=contract["text"])
            try:
                analysis_result = json.loads(result)
            except json.JSONDecodeError:
                analysis_result = {"raw_result": result}
            
            results.append({
                "title": contract["title"],
                "index": i,
                "success": True,
                "result": analysis_result
            })
        except Exception as e:
            results.append({
                "title": contract["title"],
                "index": i,
                "success": False,
                "error": str(e)
            })
    
    return {
        "success": True,
        "total_contracts": len(request.contracts),
        "results": results
    }

@app.post("/semantic-search")
async def semantic_search(query: str, contracts: List[Dict[str, str]]):
    """Search through contracts using semantic similarity"""
    # This would typically use a vector database like ChromaDB
    # For now, returning a simple implementation
    return {
        "query": query,
        "message": "Semantic search endpoint - integrate with ChromaDB for full functionality",
        "results": []
    }

@app.get("/templates")
async def get_contract_templates():
    """Get available contract templates for analysis"""
    templates = [
        {"id": "employment", "name": "Employment Contract", "description": "Standard employment agreement template"},
        {"id": "nda", "name": "Non-Disclosure Agreement", "description": "Confidentiality agreement template"},
        {"id": "service", "name": "Service Agreement", "description": "Professional services contract template"},
        {"id": "lease", "name": "Lease Agreement", "description": "Property lease contract template"},
        {"id": "purchase", "name": "Purchase Agreement", "description": "Asset purchase contract template"}
    ]
    
    return {"templates": templates}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)