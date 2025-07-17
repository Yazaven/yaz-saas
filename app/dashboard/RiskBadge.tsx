// app/dashboard/RiskBadge.tsx
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  riskLevel: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";
}

export default function Badge({ riskLevel }: RiskBadgeProps) {
  const riskConfig = {
    HIGH: {
      label: "High Risk",
      className: "bg-red-100 text-red-800"
    },
    MEDIUM: {
      label: "Medium Risk",
      className: "bg-yellow-100 text-yellow-800"
    },
    LOW: {
      label: "Low Risk",
      className: "bg-green-100 text-green-800"
    },
    UNKNOWN: {
      label: "Analysis Pending",
      className: "bg-gray-100 text-gray-800"
    }
  };

  const config = riskConfig[riskLevel] || riskConfig.UNKNOWN;

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config.className
    )}>
      {config.label}
    </span>
  );
}