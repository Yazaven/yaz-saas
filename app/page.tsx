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
  Star,
  Check
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
      icon: <FileText className="w-6 h-6" />,
      title: "AI Clause Extraction",
      description: "Identify and classify clauses across thousands of contracts using GPT-4"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Risk Detection",
      description: "Flag non-standard language and compliance risks automatically"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Semantic Search",
      description: "Find similar clauses across your entire contract repository"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Bulk Audit",
      description: "Process thousands of contracts simultaneously for compliance"
    }
  ];

  const testimonials = [
    {
      quote: "Lexora reduced our contract review time from 3 weeks to 2 days. The AI caught risks our junior associates missed.",
      author: "Sarah Johnson",
      company: "General Counsel, Fortune 500 Tech"
    },
    {
      quote: "The semantic search capability alone saved us 200+ hours in our last compliance audit. Worth every penny.",
      author: "Michael Chen",
      company: "Head of Legal Ops, Global Insurance Firm"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-xl">Lexora.ai</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Features</a>
          <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Testimonials</a>
          <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Pricing</a>
        </div>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={() => window.location.href = "#cta"}
        >
          Request Demo
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8">
                <Star className="w-4 h-4" />
                AI-Powered Contract Intelligence
              </span>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl mx-auto"
            >
              Automate Legal Contract Review with <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">AI Intelligence</span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Lexora helps legal operations teams analyze, audit, and extract insights from thousands of contracts using GPT-4 and semantic search.
            </motion.p>
            
            <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all"
                onClick={() => window.location.href = "#cta"}
              >
                Request Enterprise Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg"
              >
                Technical Documentation
              </Button>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="mt-16 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl max-w-4xl mx-auto"
            >
              <div className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-96" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Trusted by legal teams at</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {['Fortune 500 Company', 'Global Law Firm', 'Insurance Leader', 'Healthcare Group', 'Tech Unicorn'].map((company, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-gray-700 dark:text-gray-300 font-medium"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Enterprise Contract Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-gray-600 dark:text-gray-400"
            >
              Built for legal operations teams handling high-volume contract management
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Advanced AI Architecture
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              { name: "GPT-4", desc: "LLM Intelligence" },
              { name: "LangChain", desc: "AI Orchestration" },
              { name: "Pinecone", desc: "Vector Search" },
              { name: "React", desc: "Frontend" },
              { name: "FastAPI", desc: "Backend" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-200 dark:border-gray-800"
              >
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{tech.name}</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Trusted by Legal Innovators
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
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-xl font-light italic text-gray-800 dark:text-gray-200">
                  {testimonial.quote}
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
      <section id="cta" className="py-28 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-3xl p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to automate your contract review?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Schedule a private demo to see how Lexora can reduce contract review time by 85%
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                Request Enterprise Demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-indigo-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-indigo-500" />
                GDPR & SOC 2 Compliant
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-indigo-500" />
                Enterprise-grade security
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-xl">Lexora.ai</span>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                AI contract intelligence for enterprise legal teams
              </p>
              <p className="text-gray-600 dark:text-gray-400">San Francisco & Tel Aviv</p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Security", "Enterprise", "Pricing"] },
              { title: "Solutions", links: ["Legal Teams", "Compliance", "Due Diligence", "M&A"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-gray-900 dark:text-white font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 Lexora, Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}