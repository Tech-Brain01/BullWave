import React from 'react'

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { TrendingUp, Download, BarChart3, RefreshCw } from "lucide-react";

const Action = () => {
  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Button className="h-16 bg-primary/80 hover:shadow-glow transition-all duration-300">
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">New Trade</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16 hover:bg-primary/10 transition-all duration-300">
              <div className="text-center">
                <Download className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Export Report</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16 hover:bg-primary/10 transition-all duration-300">
              <div className="text-center">
                <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Analytics</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16 hover:bg-primary/10 transition-all duration-300">
              <div className="text-center">
                <RefreshCw className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Sync Data</span>
              </div>
            </Button>
          </motion.div>
  )
}

export default Action