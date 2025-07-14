"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  FileText, 
  ShieldCheck,
  Search,
  Layers,
  Briefcase,
  BarChart,
  Database,
  Cloud,
  Check,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "AI Clause Extraction",
      description: "Identify and classify clauses across contracts using GPT-4"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Risk Detection",
      description: "Flag non-standard language and compliance risks"
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Semantic Search",
      description: "Find similar clauses across your entire repository"
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Bulk Audit",
      description: "Process thousands of contracts simultaneously"
    }
  ];

  const solutions = [
    {
      title: "M&A Due Diligence",
      description: "Accelerate acquisition reviews with AI-powered contract analysis",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      title: "Compliance Audits",
      description: "Automate regulatory compliance checks across contract portfolios",
      icon: <BarChart className="w-5 h-5" />
    },
    {
      title: "CLM Integration",
      description: "Seamlessly connect with existing contract lifecycle systems",
      icon: <Database className="w-5 h-5" />
    },
    {
      title: "Cloud Repository",
      description: "Centralized, secure storage for enterprise contracts",
      icon: <Cloud className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      quote: "Lexora reduced contract review time from 3 weeks to 2 days. The AI caught risks our associates missed.",
      author: "Sarah Johnson",
      company: "General Counsel, Fortune 500"
    },
    {
      quote: "The semantic search saved us 200+ hours in compliance audits. Enterprise-grade solution.",
      author: "Michael Chen",
      company: "Head of Legal Ops, Global Insurance"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] dark:from-[#0f172a] dark:to-[#1e293b]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-[#0f172a] dark:text-white text-xl">Lexora.ai</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#solutions" className="text-[#475569] dark:text-[#cbd5e1] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-colors">Solutions</a>
          <a href="#features" className="text-[#475569] dark:text-[#cbd5e1] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-colors">Features</a>
          <a href="#testimonials" className="text-[#475569] dark:text-[#cbd5e1] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-colors">Testimonials</a>
        </div>
        <Button 
          variant="outline"
          className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#e0f2fe] dark:border-[#38bdf8] dark:text-[#38bdf8] dark:hover:bg-[#1e3a8a]"
          onClick={() => window.location.href = "#cta"}
        >
          Request Demo
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="lg:w-1/2">
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0f2fe] dark:bg-[#1e3a8a] text-[#0369a1] dark:text-[#7dd3fc] text-sm font-medium mb-6">
                  AI-Powered Contract Intelligence
                </span>
              </motion.div>

              <motion.h1 
                variants={item}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] dark:text-white"
              >
                Automate Legal Review with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#0d9488]">Enterprise AI</span>
              </motion.h1>
              
              <motion.p 
                variants={item}
                className="mt-6 text-lg md:text-xl text-[#475569] dark:text-[#cbd5e1] max-w-2xl"
              >
                Lexora helps legal teams analyze, audit, and extract insights from thousands of contracts using AI-powered intelligence.
              </motion.p>
              
              <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#0ea5e9] to-[#0d9488] hover:from-[#0284c7] hover:to-[#0f766e] text-white px-8 py-6 text-base transition-all"
                  onClick={() => window.location.href = "#cta"}
                >
                  Request Enterprise Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9] dark:border-[#475569] dark:text-[#cbd5e1] dark:hover:bg-[#1e293b] px-8 py-6 text-base"
                >
                  View Technical Specs
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              variants={item}
              className="lg:w-1/2 w-full mt-12 lg:mt-0"
            >
              <div className="bg-gradient-to-br from-white to-[#f1f5f9] dark:from-[#1e293b] dark:to-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-2xl overflow-hidden shadow-xl">
                {/* Replace with your image */}
                <div className="bg-gray-200 border-2 border-dashed w-full h-96 flex items-center justify-center text-[#94a3b8]">
                  Legal Dashboard Preview
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="py-12 bg-[#f1f5f9] dark:bg-[#1e293b] border-t border-b border-[#e2e8f0] dark:border-[#334155]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[#64748b] dark:text-[#94a3b8] mb-10 text-sm uppercase tracking-wider">Trusted by legal teams at</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {[
              { name: "Global Law Firm", class: "text-lg text-[#334155] dark:text-[#e2e8f0]" },
              { name: "Fortune 500", class: "text-xl font-medium text-[#0f172a] dark:text-white" },
              { name: "Insurance Leader", class: "text-lg text-[#334155] dark:text-[#e2e8f0]" },
              { name: "Healthcare Group", class: "text-lg text-[#334155] dark:text-[#e2e8f0]" },
              { name: "Tech Unicorn", class: "text-xl font-medium text-[#0f172a] dark:text-white" }
            ].map((company, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center ${company.class}`}
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Solutions Section */}
      <section id="solutions" className="py-20 px-4 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-white"
            >
              Enterprise Legal Solutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto"
            >
              AI-powered tools designed for complex enterprise legal operations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1e293b] p-8 rounded-xl border border-[#e2e8f0] dark:border-[#334155] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start">
                  <div className="mt-0.5 text-[#0ea5e9] dark:text-[#38bdf8]">
                    {solution.icon}
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold text-[#0f172a] dark:text-white group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-[#64748b] dark:text-[#94a3b8]">
                      {solution.description}
                    </p>
                    <div className="mt-6 flex items-center text-[#0ea5e9] dark:text-[#38bdf8] group-hover:text-[#0d9488] dark:group-hover:text-[#2dd4bf] transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#f1f5f9] dark:bg-[#1e293b]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-white"
            >
              Advanced Contract Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-[#64748b] dark:text-[#94a3b8]"
            >
              AI-powered capabilities designed for enterprise legal teams
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-[#e2e8f0] dark:border-[#334155]"
              >
                <div className="text-[#0ea5e9] dark:text-[#38bdf8]">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#0f172a] dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-[#64748b] dark:text-[#94a3b8]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-white"
            >
              Enterprise Validation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f1f5f9] dark:bg-[#1e293b] p-8 rounded-xl border border-[#e2e8f0] dark:border-[#334155]"
              >
                <div className="text-xl text-[#0f172a] dark:text-[#e2e8f0] italic">
                  {testimonial.quote}
                </div>
                <div className="mt-6 flex items-center">
                  <div className="mr-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0f172a] dark:text-white">{testimonial.author}</p>
                    <p className="text-[#64748b] dark:text-[#94a3b8]">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-28 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#0d9488]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Transform Your Contract Review Process
            </h2>
            <p className="mt-4 text-[#e0f2fe] max-w-xl mx-auto">
              See how Lexora can reduce contract review time by 85% with AI-powered intelligence
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="bg-white text-[#0f172a] hover:bg-[#e0f2fe] px-8 py-6 text-base"
              >
                Request Enterprise Demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[#bae6fd] text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Enterprise-grade security
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                SOC 2 & GDPR compliant
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Dedicated support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0f172a] dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-white text-xl">Lexora.ai</span>
              </div>
              <p className="mb-4 text-[#cbd5e1] max-w-md">
                AI contract intelligence for enterprise legal teams
              </p>
              <p className="text-[#94a3b8]">San Francisco & Tel Aviv</p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Security", "Solutions", "Pricing"] },
              { title: "Resources", links: ["Documentation", "API", "Compliance", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Contact", "Partners"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-white font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-[#94a3b8] hover:text-[#0ea5e9] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#1e293b] mt-12 pt-8 text-sm text-[#94a3b8]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 Lexora, Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#0ea5e9] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#0ea5e9] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#0ea5e9] transition-colors">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}