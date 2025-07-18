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
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="Legalynx AI Contract Analysis API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://legalynx.ai",
        "https://*.vercel.app",
        "https://*.netlify.app"    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response

class ContractRequest(BaseModel):
    contract_text: str
    analysis_type: str = "full"  

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
    contracts: List[Dict[str, str]]

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        logger.error(f"PDF extraction error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        text = docx2txt.process(io.BytesIO(file_content))
        return text
    except Exception as e:
        logger.error(f"DOCX extraction error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error reading DOCX: {str(e)}")

def get_llm_chain(analysis_type: str = "full"):
    """Get LangChain LLM with appropriate prompt"""
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        logger.error("OpenAI API key not found")
        raise HTTPException(status_code=500, detail="OpenAI API key not configured.")
    
    try:
        llm = OpenAI(
            openai_api_key=openai_api_key,
            temperature=0,
            model_name="gpt-4.1-mini",  
            max_tokens=2000
        )
    except Exception as e:
        logger.error(f"OpenAI initialization error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"OpenAI configuration error: {str(e)}")

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
                    "severity": "High",
                    "location": "Where in the contract this risk appears",
                    "recommendation": "How to mitigate this risk"
                }}
            ],
            "compliance_issues": [
                {{
                    "issue": "Description of compliance issue",
                    "regulation": "Relevant regulation or standard",
                    "severity": "Medium",
                    "recommendation": "How to address this issue"
                }}
            ],
            "summary": "Brief summary of the contract's main terms and purpose",
            "risk_score": 65,
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
                    "severity": "High",
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
    else:  
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
                    "severity": "Medium",
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

@app.get("/")
async def root():
    return {"message": "Legalynx AI Contract Analysis API", "status": "running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "contract-analysis-api", "timestamp": "2025-07-17"}

@app.post("/analyze")
async def analyze_contract(request: ContractRequest):
    """Analyze a contract with specified analysis type"""
    logger.info(f"Received analysis request for type: {request.analysis_type}")
    
    if not request.contract_text:
        raise HTTPException(status_code=400, detail="No contract text provided.")
    
    if len(request.contract_text.strip()) < 100:
        raise HTTPException(status_code=400, detail="Contract text too short for meaningful analysis.")
    
    try:
        chain = get_llm_chain(request.analysis_type)
        logger.info("LLM chain created successfully")
        
        result = chain.run(contract=request.contract_text[:4000]) 
        logger.info("LLM analysis completed")
        
        try:
            analysis_result = json.loads(result)
            logger.info("JSON parsing successful")
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing failed: {str(e)}")
            analysis_result = {
                "summary": "Analysis completed but JSON parsing failed",
                "raw_result": result,
                "risk_score": 50,
                "clauses": ["Unable to parse specific clauses"],
                "risks": [{"risk": "JSON parsing error", "severity": "Low", "location": "API", "recommendation": "Check API response format"}],
                "compliance_issues": [],
                "recommendations": ["Review API response format"]
            }
        
        return {
            "success": True,
            "analysis_type": request.analysis_type,
            "result": analysis_result
        }
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    """Upload and analyze a contract file (PDF or DOCX)"""
    logger.info(f"File upload received: {file.filename}")
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    try:
        file_content = await file.read()
        logger.info(f"File read successfully, size: {len(file_content)} bytes")
        
        if file.content_type == "application/pdf":
            contract_text = extract_text_from_pdf(file_content)
        else:  
            contract_text = extract_text_from_docx(file_content)
        
        if not contract_text.strip():
            raise HTTPException(status_code=400, detail="No text could be extracted from the file")
        
        logger.info(f"Text extracted successfully, length: {len(contract_text)}")
        
        chain = get_llm_chain("full")
        result = chain.run(contract=contract_text[:4000])  
        
        try:
            analysis_result = json.loads(result)
        except json.JSONDecodeError:
            analysis_result = {
                "summary": "Analysis completed but JSON parsing failed",
                "raw_result": result,
                "risk_score": 50,
                "clauses": ["Unable to parse specific clauses"],
                "risks": [],
                "compliance_issues": [],
                "recommendations": ["Review API response format"]
            }
        
        return {
            "success": True,
            "filename": file.filename,
            "extracted_text_length": len(contract_text),
            "result": analysis_result
        }
    
    except Exception as e:
        logger.error(f"File processing failed: {str(e)}")
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
            result = chain.run(contract=contract["text"][:4000])  
            try:
                analysis_result = json.loads(result)
            except json.JSONDecodeError:
                analysis_result = {"raw_result": result, "risk_score": 50}
            
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

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint working", "timestamp": "2025-07-17"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)