// app/page.tsx
import { ArrowRightIcon, ShieldCheckIcon, DocumentMagnifyingGlassIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-gray-900 text-xl">Lexora.ai</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-indigo-600">Case Studies</a>
          <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
          Request Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-indigo-50 px-4 py-1 rounded-full mb-4">
            <span className="text-indigo-700 font-medium">AI-Powered Contract Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Automate Legal Contract Review
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Lexora uses advanced AI to analyze, audit, and extract risk insights from thousands of contracts in minutes - not weeks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg transition duration-300 text-lg font-medium">
              Schedule Enterprise Demo
            </button>
            <button className="border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-8 py-4 rounded-lg transition duration-300 text-lg font-medium">
              Technical Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">Trusted by legal teams at</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {['Fortune 500 Company', 'Global Law Firm', 'Insurance Leader', 'Healthcare Group', 'Tech Unicorn'].map((company) => (
              <div key={company} className="text-center text-gray-400 font-medium">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Contract Intelligence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built by legal ops veterans and AI researchers for high-volume contract management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg mb-6 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="mt-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Legal Innovators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How leading legal teams are transforming contract management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to automate your contract review?</h2>
          <p className="text-indigo-100 text-xl mb-8 max-w-3xl mx-auto">
            Schedule a private demo to see how Lexora can reduce contract review time by 85% with our AI-powered platform
          </p>
          <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition duration-300">
            Request Enterprise Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-white text-xl">Lexora.ai</span>
              </div>
              <p className="mb-4">AI contract intelligence for enterprise legal teams</p>
              <p>San Francisco & Tel Aviv</p>
            </div>
            
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-white font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 Lexora, Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature data
const features = [
  {
    icon: <DocumentMagnifyingGlassIcon className="h-6 w-6 text-indigo-600" />,
    title: "Clause Extraction & Tagging",
    description: "Automatically identify and classify clauses across thousands of contracts using GPT-4 and custom AI models"
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />,
    title: "Risk Detection",
    description: "Flag non-standard language, regulatory risks, and unfavorable terms with explainable AI scoring"
  },
  {
    icon: <BuildingLibraryIcon className="h-6 w-6 text-indigo-600" />,
    title: "Bulk Audit & Compliance",
    description: "Conduct portfolio-wide compliance audits across your entire contract repository in minutes"
  }
];

// Testimonial data
const testimonials = [
  {
    quote: "Lexora reduced our contract review time from 3 weeks to 2 days. The AI caught risks our junior associates missed.",
    name: "Sarah Johnson",
    title: "General Counsel, Fortune 500 Tech Company"
  },
  {
    quote: "The semantic search capability alone saved us 200+ hours in our last compliance audit. Worth every penny.",
    name: "Michael Chen",
    title: "Head of Legal Ops, Global Insurance Firm"
  }
];

// Footer links
const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Security", "Enterprise", "Status"]
  },
  {
    title: "Solutions",
    links: ["Legal Teams", "Compliance", "Due Diligence", "M&A"]
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"]
  }
];