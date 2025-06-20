// src/StockService.js
import axios from "axios";

export async function fetchYahooFinanceData(symbol) {
  try {
    // Replace with your backend proxy endpoint
    const url = `http://localhost:4000/api/stock/${symbol}`;
    const response = await axios.get(url);
    // The response structure is now wrapped in .data.chart.result[0]
    return response.data.chart.result[0];
  } catch (error) {
    console.error("Error fetching stock data:", error);
    // Return an empty structure to avoid breaking your chart
    return { timestamp: [], indicators: { quote: [{ close: [] }] } };
  }
}
