// app/dashboard/new/page.tsx
import { SubmitButton } from "@/app/components/Submitbuttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { SubmitB } from "@/components/ui/Submitbuttons";
import { getApiUrl, testApiConnection, makeApiRequest } from "@/lib/api-config";

// Define minimal Risk interface to fix TS error
interface Risk {
  severity: string;
}

interface ApiResponse {
  success: boolean;
  analysis_type: string;
  result: {
    risk_score?: number;
    risks?: Risk[];
    clauses?: string[];
    compliance_issues?: any[];
    summary?: string;
    recommendations?: string[];
  };
}

// Helper function to get API URL with fallback (moved outside component)
function getApiUrlFallback(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 process.env.API_URL || 
                 'http://localhost:8000';
  
  // Ensure no trailing slash
  return baseUrl.replace(/\/$/, '');
}

// Helper function to test API connectivity (moved outside component)
async function testApiConnectionFallback(): Promise<boolean> {
  try {
    const response = await fetch(`${getApiUrlFallback()}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}

export default async function NewContractAnalysisRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  async function analyzeContract(formData: FormData) {
    "use server";

    if (!user) {
      throw new Error("Not authorized");
    }

    const title = formData.get("title") as string;
    const contractText = formData.get("contractText") as string;
    const analysisType = formData.get("analysisType") as string;

    if (!title || !contractText) {
      throw new Error("Title and contract text are required");
    }

    if (contractText.length < 100) {
      throw new Error("Contract text is too short for meaningful analysis");
    }

    const apiUrl = getApiUrlFallback();
    console.log('Using API URL:', apiUrl);

    // Test API connection first
    const isApiConnected = await testApiConnectionFallback();
    if (!isApiConnected) {
      console.error('API connection failed. Using fallback analysis.');
      
      // Fallback analysis if API is not available
      const fallbackAnalysis = {
        success: true,
        analysis_type: analysisType || 'full',
        result: {
          risk_score: 50,
          risks: [{
            risk: "API unavailable - using fallback analysis",
            severity: "Medium",
            location: "System",
            recommendation: "Ensure API server is running"
          }],
          clauses: ["Unable to analyze clauses - API unavailable"],
          compliance_issues: [],
          summary: "Contract analysis unavailable due to API connection issues",
          recommendations: ["Ensure API server is running", "Check network connectivity"]
        }
      };

      // Save fallback analysis to database
      try {
        const contractAnalysis = await prisma.contractAnalysis.create({
          data: {
            userId: user.id,
            title: title,
            contractText: contractText,
            analysisType: analysisType || 'full',
            analysisResult: JSON.stringify(fallbackAnalysis.result),
            riskScore: 50,
            status: 'completed'
          },
        });

        return redirect(`/dashboard/analysis/${contractAnalysis.id}`);
      } catch (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save analysis to database');
      }
    }

    try {
      console.log('Calling API analyze endpoint...');
      
      // Call FastAPI backend with timeout and retry logic
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          contract_text: contractText,
          analysis_type: analysisType || 'full'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const analysisResult: ApiResponse = await response.json();
      console.log('Analysis result received:', analysisResult.success);
      
      // Calculate risk score from the analysis result
      let riskScore = 50; // Default risk score
      
      if (analysisResult.result?.risk_score) {
        riskScore = analysisResult.result.risk_score;
      } else if (analysisResult.result?.risks && Array.isArray(analysisResult.result.risks)) {
        // Calculate risk score based on risk severities
        const risks: Risk[] = analysisResult.result.risks;
        const highRisks = risks.filter(r => r.severity === 'High').length;
        const mediumRisks = risks.filter(r => r.severity === 'Medium').length;
        const lowRisks = risks.filter(r => r.severity === 'Low').length;
        
        riskScore = Math.min(100, (highRisks * 30) + (mediumRisks * 15) + (lowRisks * 5));
      }

      // Ensure risk score is within valid range
      riskScore = Math.max(0, Math.min(100, riskScore));

      // Save analysis to database
      const contractAnalysis = await prisma.contractAnalysis.create({
        data: {
          userId: user.id,
          title: title,
          contractText: contractText,
          analysisType: analysisType || 'full',
          analysisResult: JSON.stringify(analysisResult.result),
          riskScore: riskScore,
          status: 'completed'
        },
      });

      console.log('Analysis saved to database:', contractAnalysis.id);
      return redirect(`/dashboard/analysis/${contractAnalysis.id}`);

    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Determine error type and provide specific error message
      let errorMessage = 'Failed to analyze contract. Please try again.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again with a shorter contract.';
        } else if (error.message.includes('API Error: 404')) {
          errorMessage = 'Analysis service is temporarily unavailable. Please try again later.';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <form action={analyzeContract}>
          <CardHeader>
            <CardTitle>Analyze New Contract</CardTitle>
            <CardDescription>
              Upload or paste your contract text to get AI-powered analysis for risks, 
              compliance issues, and key clauses.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="title">Contract Title</Label>
              <Input
                id="title"
                required
                type="text"
                name="title"
                placeholder="e.g., Employment Agreement - John Doe"
                maxLength={200}
              />
            </div>

            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="analysisType">Analysis Type</Label>
              <Select name="analysisType" defaultValue="full">
                <SelectTrigger>
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Analysis (Recommended)</SelectItem>
                  <SelectItem value="risks">Risk Assessment Only</SelectItem>
                  <SelectItem value="clauses">Clause Extraction</SelectItem>
                  <SelectItem value="compliance">Compliance Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="contractText">Contract Text</Label>
              <Textarea
                id="contractText"
                name="contractText"
                placeholder="Paste your contract text here or upload a file below..."
                required
                className="min-h-[300px]"
                maxLength={10000}
              />
              <p className="text-sm text-muted-foreground">
                Tip: For best results, paste the complete contract text (minimum 100 characters). 
                You can also upload PDF or DOCX files using the upload endpoint.
              </p>
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-500">
                  Or drag and drop PDF/DOCX files here
                </p>
                <p className="text-xs text-gray-400">
                  (File upload integration with /upload endpoint - coming soon)
                </p>
              </div>
            </div>

            {/* API Status Indicator */}
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              API Endpoint: {getApiUrlFallback()}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitB>Analyze Contract</SubmitB>
          </CardFooter>
        </form>
      </Card>

      {/* Analysis Types Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Analysis Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-primary">Full Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis including risks, clauses, compliance issues, and recommendations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Focus on identifying potential legal and business risks in the contract.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Clause Extraction</h4>
              <p className="text-sm text-muted-foreground">
                Extract and categorize all important clauses and their implications.
              </p>
            </div>
            <div>
              <h4 className="font-semibable text-primary">Compliance Check</h4>
              <p className="text-sm text-muted-foreground">
                Verify compliance with relevant regulations and industry standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p><strong>If analysis fails:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Ensure your contract text is at least 100 characters long</li>
              <li>Check that the API server is running on the correct port</li>
              <li>Verify your OpenAI API key is properly configured</li>
              <li>Try again with a shorter contract text if timeout occurs</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}