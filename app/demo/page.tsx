// app/demo/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    companySize: "",
    useCase: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fbfbfd] to-[#ffffff] dark:from-[#000000] dark:to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl border border-[#d2d2d7] dark:border-[#424245] shadow-lg p-8 md:p-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                Demo Request Received
              </h1>
              
              <p className="text-lg text-[#86868b] dark:text-[#a1a1a6] max-w-xl mx-auto mb-8">
                Thank you for your interest in Legalynx! Our sales team will contact you within 24 hours to schedule your personalized demo.
              </p>
              
              <div className="bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-xl p-6 text-left max-w-md mx-auto mb-10">
                <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">What to expect next:</h3>
                <ul className="space-y-3 text-[#86868b] dark:text-[#a1a1a6] text-sm">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Personalized email confirmation with calendar link</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Discovery call to understand your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Customized demo of Legalynx tailored to your use case</span>
                  </li>
                </ul>
              </div>
              
              <Link href="/">
                <Button className="bg-[#0071e3] hover:bg-[#0062c4] text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbfd] to-[#ffffff] dark:from-[#000000] dark:to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="flex justify-start mb-10">
          <Link href="/">
            <Button variant="ghost" className="text-[#86868b] dark:text-[#a1a1a6]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1d1d1f] rounded-2xl border border-[#d2d2d7] dark:border-[#424245] shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-[#0071e3] to-[#2997ff] p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="font-bold text-lg">L</span>
                </div>
                <h2 className="text-xl font-bold">Legalynx.ai</h2>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Enterprise Demo</h3>
              <p className="opacity-90 mb-2">Experience AI-powered contract intelligence</p>
              
              <ul className="space-y-3 mt-8 text-sm opacity-90">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-white" />
                  <span>Personalized 1:1 demo</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-white" />
                  <span>See how Legalynx solves your specific challenges</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-white" />
                  <span>Q&A with our product experts</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-white" />
                  <span>Beta access opportunity</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-3/5 p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Request a Demo</h1>
                <p className="text-[#86868b] dark:text-[#a1a1a6]">Schedule a personalized demo with our team</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Job Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Company Size</label>
                    <select
                      id="companySize"
                      name="companySize"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001+">1001+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="useCase" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Primary Use Case</label>
                    <select
                      id="useCase"
                      name="useCase"
                      required
                      className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                      onChange={handleChange}
                    >
                      <option value="">Select use case</option>
                      <option value="contract_review">Contract Review</option>
                      <option value="compliance">Compliance Audits</option>
                      <option value="due_diligence">M&A Due Diligence</option>
                      <option value="clm">CLM Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
                    What challenges are you facing with contract management?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-[#d2d2d7] dark:border-[#424245] rounded-lg bg-transparent"
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="w-4 h-4 mr-3"
                  />
                  <label htmlFor="consent" className="text-sm text-[#86868b] dark:text-[#a1a1a6]">
                    I agree to Legalynxs Privacy Policy and Terms of Service
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[#0071e3] hover:bg-[#0062c4] text-white py-6 text-base"
                >
                  Request Demo
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-10 text-center text-[#86868b] dark:text-[#a1a1a6] text-sm">
          <p>Have questions? <a href="mailto:sales@legalynx.ai" className="text-[#0071e3] hover:underline">sales@legalynx.ai</a></p>
          <p className="mt-2">© 2024 Legalynx, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}