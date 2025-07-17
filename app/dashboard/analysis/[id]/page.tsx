// app/dashboard/analysis/[id]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, FileText, Shield, AlertCircle } from "lucide-react";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface AnalysisPageProps {
  params: {
    id: string;
  };
}

async function getAnalysisData(analysisId: string, userId: string) {
  noStore();
  const analysis = await prisma.contractAnalysis.findUnique({
    where: {
      id: analysisId,
      userId: userId,
    },
  });

  if (!analysis) {
    return null;
  }

  // Parse the analysis result JSON
  let parsedResult = null;
  try {
    parsedResult = JSON.parse(analysis.analysisResult);
  } catch (error) {
    console.error('Failed to parse analysis result:', error);
    parsedResult = { raw_result: analysis.analysisResult };
  }

  return {
    ...analysis,
    parsedResult,
  };
}

function getRiskBadge(riskScore: number) {
  if (riskScore >= 70) {
    return <Badge variant="destructive" className="flex items-center gap-1">
      <AlertTriangle className="w-4 h-4" />
      High Risk ({riskScore}/100)
    </Badge>;
  } else if (riskScore >= 40) {
    return <Badge variant="secondary" className="flex items-center gap-1">
      <Clock className="w-4 h-4" />
      Medium Risk ({riskScore}/100)
    </Badge>;
  } else {
    return <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
      <CheckCircle className="w-4 h-4" />
      Low Risk ({riskScore}/100)
    </Badge>;
  }
}

function getSeverityBadge(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="outline">{severity}</Badge>;
  }
}

export default async function AnalysisResultPage({ params }: AnalysisPageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const analysis = await getAnalysisData(params.id, user.id);

  if (!analysis) {
    redirect('/dashboard');
  }

  const { parsedResult } = analysis;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{analysis.title}</h1>
          <p className="text-muted-foreground mt-1">
            Analyzed on {new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
              timeStyle: "short"
            }).format(new Date(analysis.createdAt))}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {getRiskBadge(analysis.riskScore || 0)}
          <Button asChild variant="outline">
            <Link href={`/dashboard/edit/${analysis.id}`}>Edit Analysis</Link>
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      {parsedResult?.summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Contract Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{parsedResult.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risks */}
        {parsedResult?.risks && parsedResult.risks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Identified Risks ({parsedResult.risks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {parsedResult.risks.map((risk: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{risk.risk}</h4>
                      {getSeverityBadge(risk.severity)}
                    </div>
                    {risk.location && (
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Location:</strong> {risk.location}
                      </p>
                    )}
                    {risk.recommendation && (
                      <p className="text-xs text-blue-600">
                        <strong>Recommendation:</strong> {risk.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compliance Issues */}
        {parsedResult?.compliance_issues && parsedResult.compliance_issues.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Compliance Issues ({parsedResult.compliance_issues.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {parsedResult.compliance_issues.map((issue: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{issue.issue}</h4>
                      {getSeverityBadge(issue.severity)}
                    </div>
                    {issue.regulation && (
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Regulation:</strong> {issue.regulation}
                      </p>
                    )}
                    {issue.recommendation && (
                      <p className="text-xs text-blue-600">
                        <strong>Recommendation:</strong> {issue.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Clauses */}
      {parsedResult?.clauses && parsedResult.clauses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Key Clauses ({parsedResult.clauses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parsedResult.clauses.map((clause: string, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <p className="text-sm">{clause}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {parsedResult?.recommendations && parsedResult.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {parsedResult.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Analysis Details */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Analysis Type</p>
              <p className="text-muted-foreground capitalize">{analysis.analysisType}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p className="text-muted-foreground capitalize">{analysis.status}</p>
            </div>
            <div>
              <p className="font-semibold">Contract Length</p>
              <p className="text-muted-foreground">{analysis.contractText.length} characters</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Dashboard */}
      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}