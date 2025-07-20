"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, FileText, ShieldCheck, Search, Layers, 
  Briefcase, BarChart, Database, Cloud, ChevronRight, 
  Mail, Zap, Check, Star, Users, TrendingUp, 
  Shield, Globe, Sparkles, Play, Gauge, BrainCircuit 
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Transition } from "framer-motion";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Clause Extraction",
      description: "Advanced GPT-4 powered analysis identifies and classifies contract clauses with 99.7% accuracy",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Risk Detection",
      description: "Proactive identification of compliance risks and non-standard language patterns",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Semantic Search",
      description: "Lightning-fast semantic search across millions of contract documents",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Bulk Processing",
      description: "Enterprise-scale processing of thousands of contracts simultaneously",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const solutions = [
    {
      title: "M&A Due Diligence",
      description: "Accelerate acquisition reviews with AI-powered contract analysis and risk assessment",
      icon: <Briefcase className="w-6 h-6" />,
      metrics: "95% faster reviews"
    },
    {
      title: "Compliance Audits",
      description: "Automated regulatory compliance checks across entire contract portfolios",
      icon: <BarChart className="w-6 h-6" />,
      metrics: "200+ hours saved"
    },
    {
      title: "CLM Integration",
      description: "Seamless integration with existing contract lifecycle management systems",
      icon: <Database className="w-6 h-6" />,
      metrics: "Zero downtime setup"
    },
    {
      title: "Cloud Repository",
      description: "Enterprise-grade secure storage with advanced search and analytics",
      icon: <Cloud className="w-6 h-6" />,
      metrics: "Bank-level security"
    }
  ];

  const testimonials = [
    {
      quote: "Legalynx transformed our contract review process. What used to take weeks now takes days, and the AI catches risks our senior associates missed.",
      author: "Sarah Johnson",
      company: "General Counsel, Fortune 500 Tech Company",
      avatar: "SJ",
      rating: 5
    },
    {
      quote: "The semantic search capabilities saved us 200+ hours during our compliance audit. This is truly enterprise-grade AI for legal.",
      author: "Michael Chen",
      company: "Head of Legal Operations, Global Insurance",
      avatar: "MC",
      rating: 5
    },
    {
      quote: "Implementation was seamless and the ROI was immediate. Our team productivity increased by 300% in the first month.",
      author: "Emily Rodriguez",
      company: "VP Legal, Investment Bank",
      avatar: "ER",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Professional",
      price: "$99",
      period: "per user/month",
      description: "Perfect for small legal teams",
      features: [
        "Up to 1,000 contracts/month",
        "Basic AI analysis",
        "Standard support",
        "API access"
      ],
      popular: false
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "per user/month",
      description: "Advanced features for large teams",
      features: [
        "Unlimited contracts",
        "Advanced AI analytics",
        "Priority support",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "Enterprise Plus",
      price: "Custom",
      period: "contact sales",
      description: "Tailored for global organizations",
      features: [
        "Everything in Enterprise",
        "On-premise deployment",
        "Custom AI training",
        "24/7 dedicated support",
        "SLA guarantees"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Legalynx: AI Contract Intelligence</h1>
          <p className="text-lg text-muted-foreground mb-8">Enterprise-grade AI for legal contract analysis and management. Accelerate reviews, detect risks, and ensure compliance with cutting-edge technology.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LoginLink>
              <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
            </LoginLink>
            <RegisterLink>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Sign Up</Button>
            </RegisterLink>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className={`rounded-xl p-6 shadow bg-gradient-to-br ${feature.gradient} text-white`}>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="rounded-xl p-6 border bg-background shadow flex flex-col items-center text-center">
                <div className="mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-sm mb-2">{solution.description}</p>
                <span className="text-xs text-muted-foreground">{solution.metrics}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-xl p-6 border bg-background shadow flex flex-col items-center text-center">
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-lg font-bold">{testimonial.avatar}</div>
                <p className="italic mb-4">{testimonial.quote}</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-xs text-muted-foreground mb-2">{testimonial.company}</div>
                <div className="flex gap-1 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 120 }}
                className={`relative rounded-xl p-6 border bg-background shadow flex flex-col items-center text-center ${plan.popular ? 'border-primary' : ''}`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
                  >
                    Most Popular
                  </motion.span>
                )}
                <h3 className="text-xl font-semibold mb-2 mt-2">{plan.name}</h3>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold mb-2"
                >
                  {plan.price}
                </motion.div>
                <div className="text-xs text-muted-foreground mb-4">{plan.period}</div>
                <p className="mb-4">{plan.description}</p>
                <ul className="mb-4 text-sm text-left list-disc list-inside">
                  {plan.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-full"
                >
                  <Button size="lg" className="w-full">{plan.popular ? 'Get Started' : 'Contact Sales'}</Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your contract analysis?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join Legalynx and experience the future of legal AI.</p>
          <LoginLink>
            <Button size="lg">Start Now</Button>
          </LoginLink>
        </div>
      </section>
    </div>
  );
}