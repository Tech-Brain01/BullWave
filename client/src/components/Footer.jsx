import { motion } from "framer-motion";
import { TrendingUp, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { Button } from "./ui/Button";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Trading", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "API", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Market News", href: "#" },
        { name: "Research", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Compliance", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "http://www.linkedin.com/in/amrendera-tomar", name: "LinkedIn" },
    { icon: Github, href: "https://github.com/Tech-Brain01", name: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Bullwave
                  </span>
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  The next-generation trading platform that empowers investors with 
                  advanced tools, real-time analytics, and AI-powered insights.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>tomar.amrendera@outlook.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>New Delhi, IN</span>
                  </div>
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                  <Button variant="premium" size="sm">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3 grid md:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-foreground">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Bullwave. All rights reserved. 
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;