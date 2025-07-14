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
      icon: <Briefcase className="w-5 h-5 text-gray-500" />
    },
    {
      title: "Compliance Audits",
      description: "Automate regulatory compliance checks across contract portfolios",
      icon: <BarChart className="w-5 h-5 text-gray-500" />
    },
    {
      title: "CLM Integration",
      description: "Seamlessly connect with existing contract lifecycle systems",
      icon: <Database className="w-5 h-5 text-gray-500" />
    },
    {
      title: "Cloud Repository",
      description: "Centralized, secure storage for enterprise contracts",
      icon: <Cloud className="w-5 h-5 text-gray-500" />
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
    <div className="bg-gradient-to-b from-white to-[#fafafa] dark:from-[#000] dark:to-[#111]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-gray-900 font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-xl">Lexora.ai</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#solutions" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Solutions</a>
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Testimonials</a>
        </div>
        <Button 
          variant="outline"
          className="border-gray-800 dark:border-gray-400 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium mb-6">
                  AI-Powered Contract Intelligence
                </span>
              </motion.div>

              <motion.h1 
                variants={item}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Automate Legal Review with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">Enterprise AI</span>
              </motion.h1>
              
              <motion.p 
                variants={item}
                className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl"
              >
                Lexora helps legal teams analyze, audit, and extract insights from thousands of contracts using AI-powered intelligence.
              </motion.p>
              
              <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-base"
                  onClick={() => window.location.href = "#cta"}
                >
                  Request Enterprise Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-base"
                >
                  View Technical Specs
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              variants={item}
              className="lg:w-1/2 w-full mt-12 lg:mt-0"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed w-full h-96" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm uppercase tracking-wider">Trusted by legal teams at</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
            {[
              { name: "Global Law Firm", class: "text-lg" },
              { name: "Fortune 500", class: "text-xl font-medium" },
              { name: "Insurance Leader", class: "text-lg" },
              { name: "Healthcare Group", class: "text-lg" },
              { name: "Tech Unicorn", class: "text-xl font-medium" }
            ].map((company, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center text-gray-700 dark:text-gray-300 ${company.class}`}
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Solutions Section */}
      <section id="solutions" className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Enterprise Legal Solutions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
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
                className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start">
                  <div className="mt-0.5">
                    {solution.icon}
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {solution.description}
                    </p>
                    <div className="mt-6 flex items-center text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
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
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Advanced Contract Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-gray-600 dark:text-gray-400"
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
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-gray-900 dark:text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
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
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-xl text-gray-800 dark:text-gray-200 italic">
                  "{testimonial.quote}"
                </div>
                <div className="mt-6 flex items-center">
                  <div className="mr-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-28 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Transform Your Contract Review Process
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              See how Lexora can reduce contract review time by 85% with AI-powered intelligence
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-base"
              >
                Request Enterprise Demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-gray-500" />
                Enterprise-grade security
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-gray-500" />
                SOC 2 & GDPR compliant
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-gray-500" />
                Dedicated support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-xl">Lexora.ai</span>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400 max-w-md">
                AI contract intelligence for enterprise legal teams
              </p>
              <p className="text-gray-600 dark:text-gray-400">San Francisco & Tel Aviv</p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Security", "Solutions", "Pricing"] },
              { title: "Resources", links: ["Documentation", "API", "Compliance", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Contact", "Partners"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-gray-900 dark:text-white font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-900 mt-12 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 Lexora, Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}