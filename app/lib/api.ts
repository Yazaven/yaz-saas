// app/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ContractAnalysisRequest {
  contract_text: string;
  analysis_type?: 'full' | 'risks' | 'clauses' | 'compliance';
}

export interface Risk {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  location?: string;
  recommendation?: string;
}

export interface ComplianceIssue {
  issue: string;
  regulation?: string;
  severity: 'High' | 'Medium' | 'Low';
  recommendation?: string;
}

export interface AnalysisResult {
  clauses?: string[];
  risks?: Risk[];
  compliance_issues?: ComplianceIssue[];
  summary?: string;
  risk_score?: number;
  recommendations?: string[];
}

export interface ApiResponse {
  success: boolean;
  analysis_type: string;
  result: AnalysisResult;
}

export class ApiService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  static async analyzeContract(request: ContractAnalysisRequest): Promise<ApiResponse> {
    return this.makeRequest('/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  static async uploadContract(file: File): Promise<ApiResponse & { filename: string; extracted_text_length: number }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
      throw new Error(error.detail || `Upload failed with status ${response.status}`);
    }

    return response.json();
  }

  static async bulkAnalyze(contracts: Array<{ title: string; text: string }>) {
    return this.makeRequest('/bulk-analyze', {
      method: 'POST',
      body: JSON.stringify({ contracts }),
    });
  }

  static async getTemplates() {
    return this.makeRequest('/templates');
  }

  static async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default ApiService;