"use server";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createFallbackAnalysis, calculateRiskScore, saveAnalysisToDatabase, getApiUrlFallback, testApiConnectionFallback } from "./utils";

export async function analyzeContract(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  const title = formData.get("title") as string;
  const contractText = formData.get("contractText") as string;
  const analysisType = formData.get("analysisType") as string;

  if (!title || !contractText) {
    throw new Error("Title and contract text are required");
  }

  // Count words instead of characters
  const wordCount = contractText.trim().split(/\s+/).length;
  if (wordCount < 100) {
    throw new Error("Contract text must contain at least 100 words for meaningful analysis.");
  }

  const apiUrl = getApiUrlFallback();
  console.log('Using API URL:', apiUrl);

  const isApiConnected = await testApiConnectionFallback();
  if (!isApiConnected) {
    console.error('API connection failed. Using fallback analysis.');
    const fallbackAnalysis = createFallbackAnalysis(analysisType);
    const contractAnalysis = await saveAnalysisToDatabase(
      user,
      title,
      contractText,
      analysisType,
      fallbackAnalysis.result,
      50
    );
    redirect(`/dashboard/analysis/${contractAnalysis.id}`);
  }

  console.log('Calling API analyze endpoint...');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
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
    const analysisResult = await response.json();
    console.log('Analysis result received:', analysisResult.success);
    const riskScore = calculateRiskScore(analysisResult);
    const contractAnalysis = await saveAnalysisToDatabase(
      user,
      title,
      contractText,
      analysisType,
      analysisResult.result,
      riskScore
    );
    redirect(`/dashboard/analysis/${contractAnalysis.id}`);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }
    console.error('Analysis failed:', error);
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
