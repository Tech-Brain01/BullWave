import React,  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  TrendingUp,
  PieChart,
  BarChart3,
  CreditCard,
  Wallet,
  IndianRupee,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { Checkbox } from "../components/ui/CheckBox";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  const financeElements = [
    { Icon: TrendingUp, delay: 0, x: 450, y: 50 },
    { Icon: IndianRupee, delay: 0.3, x: 570, y: 180 },
    { Icon: CreditCard, delay: 0.6, x: 460, y: 190 },
    { Icon: Wallet, delay: 0.9, x: 550, y: 60 },
    { Icon: BarChart3, delay: 1.2, x: 500, y: 130 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden mt-10">
      
      {/* animated Elements */}

      {financeElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20 "
          style={{ left: element.x, top: element.y }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <element.Icon className="w-10 h-10 text-primary" />
        </motion.div>
      ))}

      {/* Large rotating elements */}
      <motion.div
        className="absolute top-32 right-32 opacity-10"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <PieChart className="w-28 h-28 text-primary" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-32 opacity-10"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <TrendingUp className="w-20 h-20 text-primary" />
      </motion.div>

      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-4 md:max-w-xs">
                Get
                <span className="block bg-gradient-financial bg-clip-text text-transparent md:max-w-xs">
                  Started
                </span>
              </h1>
              <p className="text-xl text-muted-foreground lg:max-w-md md:max-w-xs">
                Join thousands of traders and start your financial journey today
              </p>
            </div>

            {/* Animated Finance Process Flow */}
            <div className="relative h-80 flex flex-col items-center justify-center space-y-8">
              <motion.div
                className="flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Card className="p-6 bg-card/80 backdrop-blur-sm">
                    <Wallet className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm text-center">Create Account</p>
                  </Card>
                </motion.div>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/30"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Card className="p-6 bg-card/80 backdrop-blur-sm">
                    <CreditCard className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm text-center">Fund Wallet</p>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.div
                className="w-0.5 h-16 bg-gradient-to-b from-primary to-primary/30"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 4,
                  delay: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Card className="p-6 bg-card/80 backdrop-blur-sm">
                  <TrendingUp className="w-10 h-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-center">Start Trading</p>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold">Create Account</h2>
                  <p className="text-muted-foreground">
                    Start your trading journey in minutes
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-background/50"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-background/50"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="bg-background/50 pr-10"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="bg-background/50 pr-10"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Create Account
                  </Button>
                </form>
                <ToastContainer/>
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
