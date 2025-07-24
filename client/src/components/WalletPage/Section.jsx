import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tab";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { 
  Wallet as WalletIcon,
  CreditCard,
  Banknote,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  RefreshCw,
  Shield,
  Lock,
  History,
  Send,
  Download,
  IndianRupee,
  PiggyBank,
  AlertTriangle
} from "lucide-react";

const Section = ({ hideBalances = false }) => {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [transferAmount, setTransferAmount] = useState("");

     const accounts = [
    {
      name: "Trading Account",
      type: "trading",
      balance: 35420.60,
      currency: "INR",
      status: "active",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      name: "Savings Account", 
      type: "savings",
      balance: 12847.23,
      currency: "INR",
      status: "active",
      icon: PiggyBank,
      color: "text-success"
    },
    {
      name: "Emergency Fund",
      type: "emergency",
      balance: 4580.00,
      currency: "INR",
      status: "active", 
      icon: Shield,
      color: "text-accent"
    }
  ];

  const recentTransactions = [
    {
      id: "TRN-001",
      type: "deposit",
      description: "Bank Transfer from Chase",
      amount: 5000.00,
      timestamp: "2024-01-18T10:30:00Z",
      status: "completed",
      account: "Trading Account"
    },
    {
      id: "TRN-002",
      type: "withdrawal", 
      description: "ATM Withdrawal",
      amount: -200.00,
      timestamp: "2024-01-17T15:45:00Z",
      status: "completed",
      account: "Savings Account"
    },
    {
      id: "TRN-003",
      type: "transfer",
      description: "Internal Transfer",
      amount: -1000.00,
      timestamp: "2024-01-16T09:20:00Z", 
      status: "pending",
      account: "Trading Account"
    },
    {
      id: "TRN-004",
      type: "interest",
      description: "Monthly Interest",
      amount: 47.83,
      timestamp: "2024-01-15T00:00:00Z",
      status: "completed",
      account: "Savings Account"
    }
  ];

  const paymentMethods = [
    {
      type: "bank",
      name: "Chase Checking ****1234",
      isDefault: true,
      verified: true,
      icon: Banknote
    },
    {
      type: "card",
      name: "Visa ****5678",
      isDefault: false,
      verified: true,
      icon: CreditCard
    },
    {
      type: "card", 
      name: "Mastercard ****9012",
      isDefault: false,
      verified: false,
      icon: CreditCard
    }
  ];

  const formatValue = (value) => {
    return hideBalances ? "******" : `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-destructive" />;
      case "transfer":
        return <RefreshCw className="w-4 h-4 text-accent" />;
      case "interest":
        return <TrendingUp className="w-4 h-4 text-primary" />;
      default:
        return <IndianRupee className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Accounts */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                    <h3 className="text-xl font-semibold mb-6">Your Accounts</h3>
                    <div className="space-y-4">
                      {accounts.map((account, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <account.icon className={`w-4 h-4 ${account.color}`} />
                              </div>
                              <div>
                                <p className="font-medium">{account.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{account.type} • {account.currency}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              {account.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">{formatValue(account.balance)}</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Send className="w-3 h-3 mr-1" />
                                Send
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-1" />
                                Receive
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Recent Activity</h3>
                      <Button variant="outline" size="sm">
                        <History className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                          <div className="flex items-center gap-3">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <p className="font-medium text-sm">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.account}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${transaction.amount >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="transfer" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                    <h3 className="text-xl font-semibold mb-6">Add Funds</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="₹0.00"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="from-account">From Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Chase Checking ****1234</SelectItem>
                            <SelectItem value="card">Visa ****5678</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="to-account">To Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trading">Trading Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-gradient-premium hover:shadow-glow transition-all duration-300">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                    <h3 className="text-xl font-semibold mb-6">Withdraw Funds</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="withdraw-amount">Amount</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="₹0.00"
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="from-wallet">From Wallet</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select wallet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trading">Trading Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="to-bank">To Bank Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Chase Checking ****1234</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Minus className="w-4 h-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Payment Methods</h3>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Method
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <method.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{method.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {method.isDefault && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                                    Default
                                  </Badge>
                                )}
                                {method.verified ? (
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!method.isDefault && (
                              <Button variant="outline" size="sm">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                  <h3 className="text-xl font-semibold mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                        <div className="flex items-center gap-4">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.account} • {new Date(transaction.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${transaction.amount >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              transaction.status === 'completed' 
                                ? 'bg-success/10 text-success border-success/20' 
                                : 'bg-accent/10 text-accent border-accent/20'
                            }`}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="p-4 bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-accent">Your funds are secure</p>
                  <p className="text-sm text-muted-foreground">
                    All transactions are encrypted and protected by multi-factor authentication.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
          </div>
  )
}

export default Section