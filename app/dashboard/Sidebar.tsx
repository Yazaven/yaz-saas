// app/dashboard/Sidebar.tsx
import Link from "next/link";
import { FileText, PlusCircle, Settings, BarChart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 border-r p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-legalynx">Legalynx AI</h1>
        <p className="text-sm text-muted-foreground">Contract Intelligence Platform</p>
      </div>
      
      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all"
        >
          <FileText className="h-4 w-4" />
          <span>Contracts</span>
        </Link>
        <Link
          href="/dashboard/new"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Analyze New</span>
        </Link>
        <Link
          href="/dashboard/reports"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-all"
        >
          <BarChart className="h-4 w-4" />
          <span>Risk Reports</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-all"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </nav>
      
      <div className="mt-12 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-medium mb-2">AI-Powered Analysis</h3>
        <p className="text-xs text-muted-foreground">
          Our AI identifies risks, clauses, and compliance issues in your contracts
        </p>
      </div>
    </div>
  );
}