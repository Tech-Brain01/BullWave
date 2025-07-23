import React, { useState, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, PieChart, BarChart3, IndianRupee, CreditCard, Wallet } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { Checkbox } from "../components/ui/CheckBox";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  // FIX: Destructure email and password from the state object
  const { email, password } = inputValue;

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3001/login',
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, user } = data;
      if (success && user) {
        handleSuccess(message);
        // FIX: Pass the entire user object to the login context
        login(user); 
        
        // Redirect to the dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        handleError(message || "Invalid credentials.");
      }
    } catch (error) {
      console.log(error);
      handleError("An error occurred. Please try again later.");
    }
  };

  // Finance-themed floating elements with animations
  const financeElements = [
    { Icon: TrendingUp, delay: 0, x: 500, y: 50 },
    { Icon: IndianRupee, delay: 0.3, x: 590, y: 200 },
    { Icon: CreditCard, delay: 0.6, x: 490, y: 200 },
    { Icon: Wallet, delay: 0.9, x: 600, y: 60 },
    { Icon: BarChart3, delay: 1.2, x: 550, y: 130 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden mt-10">

      {/* Animated Finance Elements */}
      {financeElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{ left: element.x, top: element.y }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <element.Icon className="w-10 h-10 text-primary" />
        </motion.div>
      ))}

      {/* Floating animated gears equivalent (using chart icons) */}
      <motion.div
        className="absolute top-20 right-20 opacity-10"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <PieChart className="w-32 h-32 text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 opacity-10"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <BarChart3 className="w-24 h-24 text-primary" />
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
                The 
                <span className="block bg-gradient-financial bg-clip-text text-transparent md:max-w-xs">
                  Platform
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
                    <TrendingUp className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm text-center">Analytics</p>
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
                    <IndianRupee className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm text-center">Trading</p>
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
                  <PieChart className="w-10 h-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-center">Portfolio</p>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">Welcome Back</h2>
                  <p className="text-muted-foreground">
                    Sign in to access your trading dashboard
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
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
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                  </Button>
                </form>
                <ToastContainer />

          
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
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

export default SignIn;