import React, { useState, useContext } from 'react'; // Make sure useContext is imported
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // Correct path to your context

import {
  Eye,
  EyeOff,
  TrendingUp,
  PieChart,
  BarChart3,
  CreditCard,
  Wallet,
  IndianRupee,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';
import { Checkbox } from './ui/CheckBox';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // FIX: Add all form fields to the state
  const [inputValue, setInputValue] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // FIX: Destructure all values from the state object
  const { username, lastName, email, password, confirmPassword } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-right',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add validation to check if passwords match
    if (password !== confirmPassword) {
      handleError("Passwords do not match.");
      return;
    }
    try {
      // Send only the necessary data to the backend
      const { data } = await axios.post(
        'http://localhost:3001/signup',
        { username, email, password },
        { withCredentials: true }
      );
      const { success, message, newUser } = data;
      if (success) {
        handleSuccess(message);
        login({ username: newUser.username });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('An error occurred during sign-up.');
    }
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
      {/* ... your motion divs for animation ... */}
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* ... Left side with animations ... */}
          <motion.div /* ... */ >
            {/* ... */}
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
                        name="username" // Name matches state property
                        value={username} // Value comes from state
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
                        name="lastName" // Name matches state property
                        value={lastName} // Value comes from state
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
                        type={showPassword ? 'text' : 'password'}
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className="bg-background/50 pr-10"
                        name="confirmPassword" // Name matches state property
                        value={confirmPassword} // Value comes from state
                        onChange={handleOnChange}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Create Account
                  </Button>
                </form>
                <ToastContainer />
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
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