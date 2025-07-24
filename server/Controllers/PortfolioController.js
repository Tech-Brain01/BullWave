const Portfolio = require("../model/Portfolio");
const StockMetadata = require("../model/Metadata"); // Import the metadata model

module.exports.getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      // Return null instead of 404 to prevent frontend errors for new users
      return res.status(200).json(null);
    }

    // --- ENHANCEMENT: Enrich holdings with metadata ---
    // This looks up each stock in your portfolio and adds its name, sector, etc.
    const enhancedHoldings = await Promise.all(
      portfolio.holdings.map(async (holding) => {
        const metadata = await StockMetadata.findOne({ tickerSymbol: holding.tickerSymbol });
        
        return {
          ...holding.toObject(), // Convert mongoose doc to a plain object
          companyName: metadata ? metadata.companyName : 'Unknown Company',
          sector: metadata ? metadata.sector : 'Uncategorized',
        };
      })
    );
    
    // Send back the portfolio with the newly enhanced holdings
    res.status(200).json({ 
        ...portfolio.toObject(), 
        holdings: enhancedHoldings 
    });

  } catch (error) {
    res.status(500).json({ error: "Server error fetching portfolio.", details: error.message });
  }
};