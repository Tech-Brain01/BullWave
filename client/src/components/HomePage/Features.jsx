import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Lock,
  Globe,
  Smartphone,
} from "lucide-react";
import { Card } from "../ui/Card";

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Trading",
    description:
      "Execute trades instantly with our lightning-fast infrastructure and real-time market data.",
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Advanced algorithms analyze market trends to provide intelligent trading recommendations.",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-600/20",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description:
      "Your investments are protected with military-grade encryption and multi-layer security.",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/20",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive charts and analytics tools to help you make informed investment decisions.",
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-violet-600/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-millisecond execution times ensure you never miss a trading opportunity.",
    color: "#ef4444",
    gradient: "from-red-500/20 to-red-600/20",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description:
      "Access to international markets and thousands of stocks, ETFs, and cryptocurrencies.",
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-cyan-600/20",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Everything you need to
            <span className="block bg-gradient-financial bg-clip-text text-transparent">
              trade like a pro
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
            Bullwave combines cutting-edge technology with intuitive design to
            deliver the ultimate trading experience.
          </p>
        </motion.div>

        {/* card */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative group h-full p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glow overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-30">
                  <div 
                    className="w-full h-full rounded-lg"
                    style={{ 
                      background: `linear-gradient(45deg, ${feature.color}20, ${feature.color}40)`,
                      transform: 'rotate(45deg)'
                    }}
                  />
                </div>
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Lock, label: "Secure Trading", value: "256-bit SSL" },
              {
                icon: Smartphone,
                label: "Mobile Ready",
                value: "iOS & Android",
              },
              { icon: Globe, label: "24/7 Support", value: "Global Coverage" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{item.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
