const User = require("../model/User");
const Portfolio = require("../model/Portfolio");
const Transaction = require("../model/Transaction");

module.exports.getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    const portfolio = await Portfolio.findOne({ userId });
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // --- Calculations for Data Consistency ---
    let totalPortfolioValue = 0;
    if (portfolio && portfolio.holdings) {
      // NOTE: In a real-time application, you would fetch the current market price of each stock here.
      // For now, we are using the averageBuyPrice for calculation.
      totalPortfolioValue = portfolio.holdings.reduce(
        (acc, holding) => acc + holding.quantity * holding.averageBuyPrice,
        0
      );
    }
    
    const totalInvestedAmount = portfolio?.holdings.reduce((acc, holding) => {
        return acc + (holding.quantity * holding.averageBuyPrice);
    }, 0) || 0;


    // --- Constructing the Response ---
    const dashboardData = {
      user: user,
      portfolio: {
        ...portfolio?._doc,
        totalPortfolioValue,
        totalInvestedAmount,
      },
      transactions: transactions,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({
      error: "Server error fetching dashboard data.",
      details: error.message,
    });
  }
};