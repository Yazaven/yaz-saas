import React from 'react';

// Custom Badge Component
interface BadgeProps {
  variant?: 'destructive' | 'secondary' | 'default' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export const Badge = ({ variant = 'default', className = '', children }: BadgeProps) => {
  const baseClasses = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium';
  
  const variantClasses = {
    destructive: 'bg-red-100 text-red-800 border border-red-200',
    secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
    default: 'bg-blue-100 text-blue-800 border border-blue-200',
    outline: 'bg-transparent text-gray-700 border border-gray-300',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Mock Icons (replace with real icons if available)
const AlertTriangle = () => <span className="w-4 h-4">⚠️</span>;
const Clock = () => <span className="w-4 h-4">⏱️</span>;
const CheckCircle = () => <span className="w-4 h-4">✅</span>;

// Risk Badge Component
export function getRiskBadge(riskScore: number) {
  if (riskScore >= 70) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle />
        High Risk ({riskScore}/100)
      </Badge>
    );
  } else if (riskScore >= 40) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Clock />
        Medium Risk ({riskScore}/100)
      </Badge>
    );
  } else {
    return (
      <Badge className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200">
        <CheckCircle />
        Low Risk ({riskScore}/100)
      </Badge>
    );
  }
}

// Severity Badge Component
export function getSeverityBadge(severity: string) {
  const sev = severity?.toLowerCase() || 'unknown';
  
  if (sev === 'high') {
    return <Badge variant="destructive">High</Badge>;
  } else if (sev === 'medium') {
    return <Badge variant="secondary">Medium</Badge>;
  } else if (sev === 'low') {
    return <Badge variant="outline">Low</Badge>;
  }
  return <Badge variant="outline">{severity}</Badge>;
}