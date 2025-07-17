// app/dashboard/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Risk,ContractAnalysisRequest,ComplianceIssue, AnalysisResult  } from "../lib/api";
import { TrashDelete } from "../components/Submitbuttons";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

// Define the type for contract analysis items
type ContractAnalysisItem = {
  title: string;
  id: string;
  riskScore: number | null;
  status: string;
  createdAt: Date;
  analysisResult: AnalysisResult | null;
};

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ContractAnalysis: {
        select: {
          title: true,
          id: true,
          riskScore: true,
          status: true,
          createdAt: true,
          analysisResult: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}

function getRiskBadge(riskScore: number) {
  if (riskScore >= 70) {
    return <Badge variant="destructive" className="flex items-center gap-1">
      <AlertTriangle className="w-3 h-3" />
      High Risk
    </Badge>;
  } else if (riskScore >= 40) {
    return <Badge variant="secondary" className="flex items-center gap-1">
      <Clock className="w-3 h-3" />
      Medium Risk
    </Badge>;
  } else {
    return <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
      <CheckCircle className="w-3 h-3" />
      Low Risk
    </Badge>;
  }
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function deleteAnalysis(formData: FormData) {
    "use server";

    const analysisId = formData.get("analysisId") as string;

    await prisma.contractAnalysis.delete({
      where: {
        id: analysisId,
      },
    });

    revalidatePath("/dashboard");
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Contract Analysis Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Analyze contracts for risks, compliance issues, and key clauses
          </p>
        </div>

        {data?.Subscription?.status === "active" ? (
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/dashboard/new">Analyze New Contract</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/bulk">Bulk Analysis</Link>
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href="/dashboard/billing">Upgrade to Analyze Contracts</Link>
          </Button>
        )}
      </div>

      {data?.ContractAnalysis.length == 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            No contract analyses yet
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            Upload your first contract to get started with AI-powered legal analysis. 
            Identify risks, extract key clauses, and ensure compliance.
          </p>

          {data?.Subscription?.status === "active" ? (
            <Button asChild>
              <Link href="/dashboard/new">Analyze Your First Contract</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/billing">Upgrade to Start Analyzing</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.ContractAnalysis.map((item: ContractAnalysisItem) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-semibold text-xl text-primary">
                    {item.title}
                  </h2>
                  {getRiskBadge(item.riskScore || 0)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <p>
                    Analyzed on {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "full",
                    }).format(new Date(item.createdAt))}
                  </p>
                  <p>Risk Score: {item.riskScore || 0}/100</p>
                </div>
              </div>

              <div className="flex gap-x-2">
                <Link href={`/dashboard/analysis/${item.id}`}>
                  <Button variant="outline" size="sm">
                    View Analysis
                  </Button>
                </Link>
                <Link href={`/dashboard/edit/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteAnalysis}>
                  <input type="hidden" name="analysisId" value={item.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {data?.ContractAnalysis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <File className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Total Contracts</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{data.ContractAnalysis.length}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold">High Risk</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {data.ContractAnalysis.filter((item: ContractAnalysisItem) => (item.riskScore || 0) >= 70).length}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">Low Risk</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {data.ContractAnalysis.filter((item: ContractAnalysisItem) => (item.riskScore || 0) < 40).length}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}