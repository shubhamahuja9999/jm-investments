"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Shield, 
  PieChart, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Building,
  Heart,
  Car,
  Briefcase,
  DollarSign,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormOne from "@/components/ui/form-1";

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  returns?: string;
  onContact?: () => void;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface StatProps {
  label: string;
  value: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon, features, returns, onContact }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-background">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {returns && <Badge variant="secondary" className="mt-1">{returns}</Badge>}
        </div>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4 group-hover:bg-primary/90" onClick={onContact}>
        Contact Experts <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, content, rating }) => (
  <Card className="bg-background border-border">
    <CardContent className="pt-6">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-foreground mb-4">"{content}"</p>
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

const StatCard: React.FC<StatProps> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const PartnerBrands = () => {
  const brands = [
    "Angel One", "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank", 
    "LIC", "HDFC Life", "Max Life", "Bajaj Allianz", "TATA AIG", "Star Health",
    "HDFC ERGO", "New India Assurance", "Oriental Insurance", "National Insurance"
  ];

  return (
    <>
      <style>
        {`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      <div className="w-full py-12 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul 
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_li]:text-lg [&_li]:font-semibold [&_li]:text-muted-foreground hover:[&_li]:text-primary [&_li]:transition-colors [&_li]:cursor-pointer"
          style={{ 
            animation: 'infinite-scroll 30s linear infinite',
          }}
        >
          {brands.concat(brands).map((brand, index) => (
            <li 
              key={index} 
              className="whitespace-nowrap hover:scale-105 transition-transform"
              style={{ 
                animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const JMInvestmentsWebsite = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // Lock background scroll when modal is open
  React.useEffect(() => {
    const original = document.body.style.overflow;
    if (isConsultationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isConsultationOpen]);

  // Clear any old submit message whenever the modal opens
  React.useEffect(() => {
    if (isConsultationOpen) {
      setSubmitMessage(null);
    }
  }, [isConsultationOpen]);

  async function handleConsultationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
    };
    if (!payload.name || !payload.phone || !payload.email) {
      setSubmitMessage('Please fill all fields.');
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitMessage('Submitted! Our team will contact you soon.');
      (event.target as HTMLFormElement).reset();
      // auto-hide the success message after a few seconds
      setTimeout(() => setSubmitMessage(null), 3000);
    } catch (e) {
      setSubmitMessage('Could not submit right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }
  const products = [
    {
      title: "Mutual Funds",
      description: "Diversified investment options with professional fund management",
      icon: <TrendingUp className="h-6 w-6" />,
      features: ["SIP & Lump Sum Options", "Tax Saving Funds", "Equity & Debt Funds", "Expert Advisory"],
      returns: "12-15% Returns*"
    },
    {
      title: "Fixed Deposits",
      description: "Secure investment with guaranteed returns",
      icon: <Shield className="h-6 w-6" />,
      features: ["Guaranteed Returns", "Flexible Tenure", "Senior Citizen Benefits", "Auto Renewal"],
      returns: "7-9% Returns*"
    },
    {
      title: "Unlisted Shares",
      description: "Pre-IPO investment opportunities in promising companies",
      icon: <PieChart className="h-6 w-6" />,
      features: ["Pre-IPO Access", "High Growth Potential", "Expert Research", "Portfolio Diversification"],
      returns: "15-25% Potential*"
    },
    {
      title: "Life Insurance",
      description: "Comprehensive life coverage for your family's security",
      icon: <Heart className="h-6 w-6" />,
      features: ["Term & Whole Life", "Investment Plans", "Tax Benefits", "Rider Options"]
    },
    {
      title: "Health Insurance",
      description: "Complete healthcare coverage for medical emergencies",
      icon: <Users className="h-6 w-6" />,
      features: ["Cashless Treatment", "Family Floater", "Pre & Post Hospitalization", "No Claim Bonus"]
    },
    {
      title: "Motor Insurance",
      description: "Comprehensive vehicle insurance with instant claims",
      icon: <Car className="h-6 w-6" />,
      features: ["Third Party & Comprehensive", "Instant Policy", "24/7 Claim Support", "Zero Depreciation"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "JM Investments helped me diversify my portfolio with excellent mutual fund recommendations. The returns have been consistently good.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "Their insurance advisory is top-notch. Got the best health insurance plan for my family at competitive rates.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Doctor",
      content: "The unlisted shares opportunity they provided gave me excellent returns. Professional and trustworthy service.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary/30 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center leading-none">
              <div className="flex items-center gap-6">
                <Image src="/logo.jpg" alt="JM Investments" width={230} height={64} className="h-16 w-auto object-contain" />
                <div className="h-14 w-px bg-[#0F1D45]/30" />
                <Image src="/angel.jpeg" alt="Angel One" width={210} height={52} className="h-14 w-auto object-contain" />
              </div>
              <span className="mt-1 text-[11px] md:text-xs font-semibold tracking-wide uppercase text-[#0F1D45] text-center">Associate Partner</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#products" className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">Products</a>
              <a href="#about" className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">About</a>
              <a href="#contact" className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors">Contact</a>
              <Button asChild size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500">
                <a href="https://a.aonelink.in/ANGOne/qpGAW0M" target="_blank" rel="noopener noreferrer">Open Demat Account</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section (Product Spotlight style) */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-indigo-500/10 via-indigo-600/5 to-transparent">
        {/* Grid background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.25]" />
        </div>
        {/* Spotlight glow */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="container mx-auto px-4">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Removed hero partner badge as requested */}
              <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Your Trusted
                <span className="block bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">Financial Partner</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Comprehensive financial solutions including mutual funds, insurance, FDs, and unlisted shares. Build wealth with expert guidance and trusted partnerships.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 bg-indigo-600 hover:bg-indigo-500">
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 border-indigo-600 text-indigo-700 hover:bg-indigo-50" onClick={() => setIsConsultationOpen(true)}>
                  Free Consultation
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" /> SEBI Registered
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Personalized Advisory
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Trusted Partnerships
                </div>
              </div>
            </motion.div>

            {/* Right visual area with floating stats cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4">
                <Card className="border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardContent className="p-6">
                    <StatCard label="Assets Under Management" value="₹500Cr+" />
                  </CardContent>
                </Card>
                <Card className="border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardContent className="p-6">
                    <StatCard label="Happy Clients" value="10,000+" />
                  </CardContent>
                </Card>
                <Card className="border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardContent className="p-6">
                    <StatCard label="Years of Experience" value="15+" />
                  </CardContent>
                </Card>
                <Card className="border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardContent className="p-6">
                    <StatCard label="Products Offered" value="50+" />
                  </CardContent>
                </Card>
              </div>

              {/* Accent ring */}
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[36px] border border-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsConsultationOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-background border-border shadow-2xl">
              <CardHeader>
                <CardTitle>Free Consultation</CardTitle>
                <CardDescription>Enter your details and we’ll reach out within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormOne onSubmit={handleConsultationSubmit} isSubmitting={isSubmitting} submitMessage={submitMessage} />
                <div className="flex gap-3 pt-3">
                  <Button type="button" variant="outline" onClick={() => setIsConsultationOpen(false)} className="w-full">Close</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Partner Brands */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-lg font-semibold text-muted-foreground mb-8">
            Trusted by Leading Financial Institutions
          </h2>
          <PartnerBrands />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Financial Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of financial products to meet all your investment and protection needs
            </p>
          </div>
          
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} onContact={() => setIsConsultationOpen(true)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Angel One Partnership */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">Partnership</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Authorized Partner with
                <span className="text-primary block">Angel One</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                As an authorized partner of Angel One, we provide seamless trading and investment 
                solutions with the backing of one of India's leading broking houses.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Zero brokerage on equity delivery",
                  "Advanced trading platforms",
                  "Research and advisory support",
                  "Dedicated relationship manager"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg">Open Demat Account</Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-background border-border">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Angel One Benefits</h3>
                  <p className="text-muted-foreground mb-6">
                    Get access to premium trading features and research reports
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">₹0</div>
                      <div className="text-sm text-muted-foreground">Delivery Brokerage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">₹20</div>
                      <div className="text-sm text-muted-foreground">Intraday Brokerage</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of satisfied investors across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur px-6 py-10 md:px-10"
          >
            {/* subtle radial glow */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative grid gap-8 md:gap-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Start Your</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent mt-2">Investment Journey?</h3>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
                  Get in touch with our expert advisors for personalized financial planning and investment strategies tailored to your goals.
                </p>
              </div>

              {/* contact chips */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="tel:9958285685" className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground group-hover:text-primary">+91 9958285685</span>
                </a>
                <a href="mailto:mayank@jminvestments.in" className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-foreground group-hover:text-primary">mayank@jminvestments.in</span>
                </a>
                <a
                  href="https://www.google.com/maps/place/JM+Investments/@28.611317,77.0917676,17z/data=!3m2!4b1!5s0x39733808c65bfd0d:0x2b631a7d8fee99f1!4m6!3m5!1s0x390d1bba7893e039:0xb51dd772838c35b8!8m2!3d28.611317!4d77.0943425!16s%2Fg%2F11fq8cvh0v?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-foreground group-hover:text-primary">C-122, Community Complex, Behind Janak Cinema, Janakpuri, New Delhi - 110058</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="secondary">SEBI Registered</Badge>
                <Badge variant="secondary">Angel One Partner</Badge>
                <Badge variant="secondary">10,000+ Clients</Badge>
              </div>

              <div>
                <Button size="lg" className="px-8" onClick={() => setIsConsultationOpen(true)}>Request Free Consultation</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
                  <Image src="/logo.jpg" alt="JM Investments" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-bold text-foreground">JM Investments</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for comprehensive financial solutions and wealth creation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Mutual Funds</li>
                <li>Fixed Deposits</li>
                <li>Insurance</li>
                <li>Unlisted Shares</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
                <li>SEBI Registration</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 JM Investments. All rights reserved. | SEBI Registered Investment Advisor</p>
            <p className="mt-2">*Returns are indicative and subject to market risks. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JMInvestmentsWebsite;
