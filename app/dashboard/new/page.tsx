"use client";
// app/dashboard/new/page.tsx
import React, { useState } from "react";
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
import { analyzeContract } from "./actions";

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

function getApiUrlFallback(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 process.env.API_URL || 
                 'http://localhost:8000';
  
  return baseUrl.replace(/\/$/, '');
}

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

function createFallbackAnalysis(analysisType: string) {
  return {
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
}

function calculateRiskScore(analysisResult: ApiResponse): number {
  if (analysisResult.result?.risk_score) {
    return analysisResult.result.risk_score;
  }
  
  if (analysisResult.result?.risks && Array.isArray(analysisResult.result.risks)) {
    const risks: Risk[] = analysisResult.result.risks;
    const highRisks = risks.filter(r => r.severity === 'High').length;
    const mediumRisks = risks.filter(r => r.severity === 'Medium').length;
    const lowRisks = risks.filter(r => r.severity === 'Low').length;
    
    return Math.min(100, (highRisks * 30) + (mediumRisks * 15) + (lowRisks * 5));
  }
  
  return 50; 
}

async function saveAnalysisToDatabase(
  user: any,
  title: string,
  contractText: string,
  analysisType: string,
  analysisResult: any,
  riskScore: number
) {
  const contractAnalysis = await prisma.contractAnalysis.create({
    data: {
      userId: user.id,
      title: title,
      contractText: contractText,
      analysisType: analysisType || 'full',
      analysisResult: JSON.stringify(analysisResult),
      riskScore: Math.max(0, Math.min(100, riskScore)),
      status: 'completed'
    },
  });

  console.log('Analysis saved to database:', contractAnalysis.id);
  return contractAnalysis;
}

export default function NewContractAnalysisRoute() {
  noStore();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const contractText = (form.contractText?.value || "").trim();
    const wordCount = contractText.split(/\s+/).length;
    if (wordCount < 100) {
      e.preventDefault();
      setModalMessage("You need to insert more than 100 words for meaningful analysis.");
      setShowModal(true);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Modal for word count validation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Insufficient Words</h2>
            <p className="mb-4 text-gray-800">{modalMessage}</p>
            <button
              className="bg-primary text-black font-semibold px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <Card>
        <form action={analyzeContract} onSubmit={handleFormSubmit}>
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
              <h4 className="font-semibold text-primary">Compliance Check</h4>
              <p className="text-sm text-muted-foreground">
                Verify compliance with relevant regulations and industry standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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