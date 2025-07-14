"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { 
  ArrowRight, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Sparkles,
  Check
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useKindeBrowserClient();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

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
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Intuitive Dashboard",
      description: "Clean workspace with drag-and-drop organization"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Templates",
      description: "Professionally designed templates for any use case"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description: "Work with your team simultaneously"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Assistance",
      description: "Generate content with AI-powered suggestions"
    }
  ];

  const testimonials = [
    {
      quote: "This tool transformed how our team manages documentation. The interface is pure elegance.",
      author: "Sarah K., Product Lead",
      company: "StellarTech"
    },
    {
      quote: "I've tried dozens of note apps - this is the first that actually makes me more productive.",
      author: "Michael T., Engineering Director",
      company: "Nexus Labs"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Now with AI assistance
              </span>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl mx-auto"
            >
              Where Thoughts Become <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Organized Action</span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              The modern workspace for focused thinking, collaborative creation, and effortless organization. 
              Designed for clarity and productivity.
            </motion.p>
            
            <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <RegisterLink>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RegisterLink>
            </motion.div>
            
          </motion.div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Designed for Deep Work
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-gray-600 dark:text-gray-400"
            >
              Thoughtfully crafted tools that disappear when you need to focus
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
                <div className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg w-fit">
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
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Loved by innovative teams
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
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-2xl font-light italic text-gray-800 dark:text-gray-200">
                  {testimonial.quote}
                </div>
                <div className="mt-6">
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-3xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Join thousands of professionals who have elevated their productivity
            </p>
            <div className="mt-10">
              <RegisterLink>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 transition-all"
                >
                  Get Started Free
                </Button>
              </RegisterLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-emerald-500" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-emerald-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} NotesApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}