// app/page.tsx
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      } 
    }
  };

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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)`
            }}
            animate={{
              background: [
                `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)`,
                `radial-gradient(900px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.15) 0%, transparent 80%)`,
                `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)`
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <motion.div 
              className="absolute top-20 left-20 w-2 h-2 bg-primary/20 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-40 right-40 w-3 h-3 bg-primary/30 rounded-full"
              animate={{ scale: [1, 1.8, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.div 
              className="absolute bottom-40 left-1/3 w-1 h-1 bg-primary/40 rounded-full"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="lg:w-1/2">
              <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm border border-primary/20">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Contract Intelligence</span>
                <div className="inline-flex items-center bg-primary/20 px-2 py-1 rounded-full text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Beta
                </div>
              </motion.div>

              <motion.h1 
                variants={item}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Transform Legal Review with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Enterprise AI
                </span>
              </motion.h1>
              
              <motion.p 
                variants={item}
                className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                Legalynx empowers legal teams to analyze, audit, and extract insights from thousands of contracts using cutting-edge AI intelligence.
              </motion.p>
              
              <motion.div variants={item} className="mt-12 flex flex-col sm:flex-row gap-4">
                <RegisterLink>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group rounded-xl"
                  >
                    Start Free Trial
                    <motion.div 
                      className="ml-3 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Zap className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                      14 Days Free
                    </motion.div>
                  </Button>
                </RegisterLink>
                
                <LoginLink>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-6 text-lg transition-all duration-300 hover:bg-primary/10 group rounded-xl"
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </LoginLink>
              </motion.div>

              <motion.div variants={item} className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>10,000+ Legal Teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-purple-500" />
                  <span>99.7% Accuracy</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={item}
              className="lg:w-1/2 w-full mt-12 lg:mt-0"
            >
              <motion.div 
                className="relative bg-gradient-to-br from-card to-card/50 border rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-4 right-4 inline-flex items-center bg-primary/20 px-3 py-1 rounded-full text-xs text-primary z-10 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                  Live Preview
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse" />
                  <div className="bg-card/90 backdrop-blur-sm w-full h-96 flex items-center justify-center relative">
                    <div className="text-center p-8">
                      <motion.div 
                        className="text-4xl font-bold mb-4 text-primary"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Legalynx.ai
                      </motion.div>
                      <div className="text-muted-foreground text-lg">AI Contract Intelligence Platform</div>
                      
                      <div className="mt-8 max-w-md mx-auto">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-background/50 p-4 rounded-xl border border-border"
                          >
                            <div className="flex items-center justify-center mb-2">
                              <div className={`bg-gradient-to-r ${features[activeFeature].gradient} p-2 rounded-lg`}>
                                {features[activeFeature].icon}
                              </div>
                            </div>
                            <h3 className="font-bold">{features[activeFeature].title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {features[activeFeature].description}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Solutions Section */}
      <section id="solutions" className="py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                Enterprise Legal Solutions
              </h2>
              <div className="ml-4 inline-flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm text-primary">
                <Globe className="w-4 h-4 mr-1" />
                Global Scale
              </div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive AI-powered tools designed for complex legal operations and enterprise-scale challenges
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="absolute top-4 right-4 inline-flex items-center bg-primary/10 px-2 py-1 rounded-full text-xs text-primary">
                    {solution.metrics}
                  </div>
                  
                  <div className="flex items-start relative z-10">
                    <div className="text-primary bg-primary/10 p-3 rounded-xl">
                      {solution.icon}
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {solution.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                        {solution.description}
                      </p>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="mt-6 flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors"
                      >
                        <span>Learn more</span>
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-4 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Advanced Contract Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              Cutting-edge AI capabilities that redefine legal document analysis
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <div className={`bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 relative overflow-hidden h-full`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500`} />
                  
                  <div className={`text-white bg-gradient-to-r ${feature.gradient} p-3 rounded-xl w-fit mb-4`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Trusted by Legal Leaders
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              See how enterprise legal teams are transforming their operations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg italic leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center text-primary font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 px-4 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              Choose the plan that fits your team's needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  plan.popular ? 'border-primary/50 scale-[1.02]' : 'border-border/50'
                }`}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    <span className="text-lg text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <RegisterLink>
                  <Button 
                    className={`w-full rounded-xl ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90' 
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                    size="lg"
                  >
                    {plan.name === 'Enterprise Plus' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </RegisterLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl -z-10" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12 shadow-2xl">
              <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Transform Your Legal Operations Today
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Future of Legal Review?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of legal professionals who trust Legalynx to streamline their contract analysis and boost productivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <RegisterLink>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group rounded-xl"
                  >
                    Start Free Trial
                    <motion.div 
                      className="ml-3 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Zap className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                      14 Days Free
                    </motion.div>
                  </Button>
                </RegisterLink>
                
                <LoginLink>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-6 text-lg transition-all duration-300 hover:bg-primary/10 rounded-xl"
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </LoginLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}