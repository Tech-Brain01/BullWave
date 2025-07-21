import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Text3D,
  MeshWobbleMaterial,
  Sphere,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { TrendingUp, Play, ArrowRight } from "lucide-react";
import { Suspense } from "react";

const FinancialChart = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        {/* Main sphere with financial data visualization */}
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshWobbleMaterial
            color="#3b82f6"
            factor={0.3}
            speed={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Smaller floating elements */}
        {Array.from({ length: 8 }, (_, i) => (
          <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.3}>
            <Sphere
              args={[0.2, 16, 16]}
              position={[
                Math.cos((i * Math.PI * 2) / 8) * 3,
                Math.sin((i * Math.PI * 2) / 8) * 0.5,
                Math.sin((i * Math.PI * 2) / 8) * 3,
              ]}
            >
              <meshStandardMaterial color="#10b981" transparent opacity={0.7} />
            </Sphere>
          </Float>
        ))}
      </group>
    </Float>
  );
};

// Loading fallback
const Loader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Next-Gen Trading Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                Trade with
                <span className="block bg-gradient-financial bg-clip-text text-transparent">
                  Confidence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Experience the future of trading with Bullwave's advanced
                AI-powered platform. Make informed decisions with real-time
                analytics and premium tools.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="premium" size="lg" className="group">
                Start Trading
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg" className="group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { label: "Active Traders", value: "50K+" },
                { label: "Daily Volume", value: "$2.5B" },
                { label: "Success Rate", value: "94%" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Scene Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary">
                3D Trading Visualization
              </h3>
              <p className="text-muted-foreground">
                Interactive charts coming soon
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
