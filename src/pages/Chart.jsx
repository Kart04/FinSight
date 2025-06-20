import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { fetchYahooFinanceData } from "../StockService";

// Styles
const bgGradient = {
  minHeight: "100vh",
  minWidth: "100vw",
  background: "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #00c6ff 100%)",
  display: "flex",
  fontFamily: "'Montserrat', sans-serif",
};
const sidebarStyle = {
  width: "220px",
  background: "rgba(44,83,100,0.95)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2.5rem",
  boxShadow: "2px 0 16px rgba(0,198,255,0.07)",
  zIndex: 2,
};
const sidebarTitle = {
  fontWeight: 900,
  fontSize: "1.6rem",
  marginBottom: "2.5rem",
  color: "#00c6ff",
  letterSpacing: "0.05em",
};
const mainContent = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const glassCard = {
  background: "rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8px)",
  borderRadius: "24px",
  padding: "2.5rem 2rem",
  width: "700px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.18)",
  animation: "fadeIn 1s ease",
};
const tabBarStyle = {
  display: "flex",
  gap: "1.5rem",
  marginBottom: "1.8rem",
  justifyContent: "center",
};
const tabStyle = (active) => ({
  padding: "0.7rem 2.5rem",
  borderRadius: "12px 12px 0 0",
  background: active
    ? "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)"
    : "rgba(255,255,255,0.07)",
  color: active ? "white" : "#b3e0fc",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer",
  border: "none",
  outline: "none",
  transition: "background 0.2s, color 0.2s",
  boxShadow: active ? "0 4px 14px rgba(0,198,255,0.18)" : "none",
});
const autocompleteStyle = {
  position: "relative",
  width: "250px",
  marginBottom: "1.5em",
};
const inputStyle = {
  padding: "0.4em 0.8em",
  borderRadius: "8px",
  border: "1px solid #00c6ff",
  background: "rgba(35, 43, 54, 0.8)",
  color: "#fff",
  fontSize: "1.2em",
  width: "100px",
  boxSizing: "border-box",
  outline: "none",
};
const dropdownStyle = {
  position: "absolute",
  background: "#232b36",
  border: "1px solid #00c6ff",
  borderRadius: "8px",
  width: "100%",
  maxHeight: "200px",
  overflowY: "auto",
  zIndex: 10,
};
const suggestionStyle = {
  padding: "0.5em",
  cursor: "pointer",
  borderBottom: "1px solid #2c5364",
};
const suggestionHighlightStyle = {
  background: "rgba(0,198,255,0.2)",
};

// Autocomplete component
function StockAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // All available stocks
  const popularStocks = [
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "TSLA", name: "Tesla, Inc." },
    { symbol: "INTC", name: "Intel Corporation" },
    { symbol: "LCID", name: "Lucid Group, Inc." },
    { symbol: "SOFI", name: "SoFi Technologies, Inc." },
    { symbol: "F", name: "Ford Motor Company" },
    { symbol: "NU", name: "Nu Holdings Ltd." },
    { symbol: "PLTR", name: "Palantir Technologies Inc." },
    { symbol: "AAL", name: "American Airlines Group Inc." },
    { symbol: "MRVL", name: "Marvell Technology, Inc." },
    { symbol: "RIG", name: "Transocean Ltd." },
    { symbol: "QBTS", name: "D-Wave Quantum Inc." },
    { symbol: "RIOT", name: "Riot Platforms, Inc." },
    { symbol: "BTG", name: "B2Gold Corp." },
    { symbol: "AMD", name: "Advanced Micro Devices, Inc." },
    { symbol: "PCG", name: "PG&E Corporation" },
    { symbol: "OSCR", name: "Oscar Health, Inc." },
    { symbol: "TMC", name: "TMC the metals company Inc." },
    { symbol: "WBD", name: "Warrior Bros. Discovery, Inc." },
    { symbol: "PSLV", name: "Sprott Physical Silver Trust" },
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "AMZN", name: "Amazon.com, Inc." },
    { symbol: "QUBT", name: "Quantum Computing Inc." },
    { symbol: "HIMS", name: "Hims & Hers Health, Inc." },
    { symbol: "SMCI", name: "Super Micro Computer, Inc." }
  ];

  // Filter suggestions based on user input
  const filteredSuggestions = popularStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
  );

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const selected = filteredSuggestions[highlightedIndex];
      setQuery(selected.symbol);
      onSelect(selected.symbol);
      setShowSuggestions(false);
    }
  };

  return (
    <div style={autocompleteStyle} ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Type stock symbol or name"
        style={inputStyle}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul style={dropdownStyle}>
          {filteredSuggestions.map((stock, index) => (
            <li
              key={stock.symbol}
              onClick={() => {
                setQuery(stock.symbol);
                onSelect(stock.symbol);
                setShowSuggestions(false);
              }}
              style={{
                ...suggestionStyle,
                ...(index === highlightedIndex ? suggestionHighlightStyle : {}),
              }}
            >
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Main ChartPage component
export default function ChartPage() {
  const [activeTab, setActiveTab] = useState("charts");
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simulationData, setSimulationData] = useState([]);
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationStats, setSimulationStats] = useState(null);
  const [numSimulations, setNumSimulations] = useState(20);
  const numDays = 30; // Fixed number of days

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchYahooFinanceData(selectedStock);
        const formatted =
          data?.timestamp?.map((t, i) => ({
            time: new Date(t * 1000).toLocaleDateString(),
            price: data.indicators.quote[0].close[i],
          })) || [];
        setChartData(formatted);
      } catch (e) {
        setChartData([]);
      }
      setLoading(false);
    }
    loadData();
  }, [selectedStock]);

  function runMonteCarloSimulation() {
    if (chartData.length < 2) return;

    const prices = chartData.map(item => item.price);
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push(Math.log(prices[i] / prices[i-1]));
    }

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);

    const lastPrice = prices[prices.length - 1];
    const simulations = [];

    function simulatePrice(startPrice, days, avg, vol) {
      const path = [startPrice];
      let price = startPrice;
      for (let i = 0; i < days; i++) {
        const shock = avg + vol * (Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()));
        price = price * Math.exp(shock);
        path.push(price);
      }
      return path;
    }

    for (let i = 0; i < numSimulations; i++) {
      simulations.push(simulatePrice(lastPrice, numDays, avgReturn, stdDev));
    }

    // Prepare data for recharts
    const simulationChartData = [];
    for (let day = 0; day <= numDays; day++) {
      const dayData = { day };
      simulations.forEach((sim, idx) => {
        dayData[`sim${idx}`] = sim[day];
      });
      simulationChartData.push(dayData);
    }

    // Calculate statistics
    const finalPrices = simulations.map(sim => sim[sim.length - 1]);
    const mean = finalPrices.reduce((sum, price) => sum + price, 0) / finalPrices.length;
    const median = [...finalPrices].sort((a, b) => a - b)[Math.floor(finalPrices.length / 2)];
    const min = Math.min(...finalPrices);
    const max = Math.max(...finalPrices);
    const stdDevFinal = Math.sqrt(
      finalPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / finalPrices.length
    );
    const probPositive = (finalPrices.filter(p => p > lastPrice).length / finalPrices.length * 100).toFixed(2);
    const probDouble = (finalPrices.filter(p => p > 2 * lastPrice).length / finalPrices.length * 100).toFixed(2);
    const probHalve = (finalPrices.filter(p => p < 0.5 * lastPrice).length / finalPrices.length * 100).toFixed(2);

    // Set simulation data and statistics
    setSimulationData(simulationChartData);
    setShowSimulation(true);
    setSimulationStats({
      mean,
      median,
      min,
      max,
      stdDev: stdDevFinal,
      probPositive,
      probDouble,
      probHalve,
      lastPrice,
    });
  }

  return (
    <div style={bgGradient}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={sidebarStyle}>
        <div style={sidebarTitle}>FinSight</div>
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            "sidebar-menu-item" + (isActive ? " active" : "")
          }
        >
          Introduction
        </NavLink>
        <NavLink
          to="/chart"
          className={({ isActive }) =>
            "sidebar-menu-item" + (isActive ? " active" : "")
          }
        >
          Chart
        </NavLink>
      </div>
      <div style={mainContent}>
        <div style={glassCard}>
          <div style={tabBarStyle}>
            <button
              style={tabStyle(activeTab === "charts")}
              onClick={() => setActiveTab("charts")}
            >
              Charts
            </button>
            {/* <button
              style={tabStyle(activeTab === "analytics")}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button> */}
            <button
              style={tabStyle(activeTab === "montecarlo")}
              onClick={() => {
                setActiveTab("montecarlo");
                runMonteCarloSimulation();
              }}
            >
              Monte Carlo
            </button>
          </div>
          {activeTab === "charts" && (
            <>
              <h2 style={{ color: "#00c6ff", textAlign: "center", marginBottom: "1.2em" }}>
                FinSight Price Chart
              </h2>
              <StockAutocomplete onSelect={setSelectedStock} />
              {loading ? (
                <div style={{ color: "#00c6ff", textAlign: "center" }}>Loading...</div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="#2c3e50" strokeDasharray="4 4" />
                    <XAxis dataKey="time" stroke="#b3e0fc" />
                    <YAxis stroke="#b3e0fc" domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ background: "#232b36", border: "none", color: "#fff" }}
                      labelStyle={{ color: "#b3e0fc" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#00FFFF"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#00FFFF", stroke: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ color: "#00c6ff", textAlign: "center" }}>
                  No data available for this stock.
                </div>
              )}
            </>
          )}
          {activeTab === "analytics" && (
            <div style={{ color: "#b3e0fc", textAlign: "center", marginTop: "2em" }}>
              <h2>Analytics</h2>
              <p>Here are some key metrics and recent activity.</p>
              <div style={{ width: "100%", marginTop: "1em", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(0,198,255,0.05)", borderRadius: "8px" }}>
                  <thead>
                    <tr style={{ background: "rgba(0,198,255,0.15)" }}>
                      <th style={{ padding: "0.75em 1em", textAlign: "left", borderBottom: "1px solid #00c6ff" }}>Date</th>
                      <th style={{ padding: "0.75em 1em", textAlign: "left", borderBottom: "1px solid #00c6ff" }}>Stock</th>
                      <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Price</th>
                      <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Change</th>
                      <th style={{ padding: "0.75em 1em", textAlign: "right", borderBottom: "1px solid #00c6ff" }}>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>AAPL</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>189.98</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#4caf50" }}>+2.35%</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>45,120,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30极</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>MSFT</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>415.28</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#4caf50" }}>+1.47%</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>32,450,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>2024-05-30</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364" }}>AMZN</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>178.75</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right", color: "#f44336" }}>−0.89%</td>
                      <td style={{ padding: "0.75em 1em", borderBottom: "1px solid #2c5364", textAlign: "right" }}>28,760,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "montecarlo" && (
            <>
              <h2 style={{ color: "#00c6ff", textAlign: "center", marginBottom: "1.2em" }}>
                Monte Carlo Simulation
              </h2>
              <StockAutocomplete onSelect={setSelectedStock} />
              <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label
                    style={{
                      color: "#b3e0fc",
                      fontWeight: 500,
                      fontSize: "1.1em",
                      minWidth: 90,
                      textAlign: "right",
                    }}
                    htmlFor="numSimulations"
                  >
                    Simulations:
                  </label>
                  <input
                    id="num极Simulations"
                    type="number"
                    value={numSimulations}
                    onChange={(e) => setNumSimulations(Math.max(1, Number(e.target.value)))}
                    min="1"
                    max="1000"
                    style={inputStyle}
                  />
                </div>
              </div>
              {loading ? (
                <div style={{ color: "#00c6ff", textAlign: "center" }}>Loading...</div>
              ) : chartData.length > 0 ? (
                showSimulation ? (
                  <>
                    <ResponsiveContainer width={700} height={350}>
                      <LineChart data={simulationData}>
                        <CartesianGrid stroke="#2c3e50" strokeDasharray="4 4" />
                        <XAxis dataKey="day" stroke="#b3e0fc" domain={[0, numDays]} />
                        <YAxis stroke="#b3e0fc" domain={["auto", "auto"]} />
                        <Tooltip
                          contentStyle={{ background: "#232b36", border: "none", color: "#fff" }}
                          labelStyle={{ color: "#b3e0fc" }}
                        />
                        {/* No Legend */}
                        {Array.from({ length: numSimulations }).map((_, idx) => (
                          <Line
                            key={idx}
                            dataKey={`sim${idx}`}
                            stroke="#FF746C"
                            dot={false}
                            strokeOpacity={0.5}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                    {simulationStats && (
                      <div style={{
                        marginTop: "1em",
                        background: "rgba(0,198,255,0.1)",
                        padding: "1em",
                        borderRadius: "8px",
                        color: "#b3e0fc",
                        textAlign: "center"
                      }}>
                        <h3>Simulation Statistics</h3>
                        <table style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          margin: "0.5em 0"
                        }}>
                          <thead>
                            <tr style={{ background: "rgba极0,198,255,0.15)", borderBottom: "1px solid #00c6ff" }}>
                              <th style={{ padding: "0.5em", textAlign: "left" }}>Statistic</th>
                              <th style={{ padding: "0.5em", textAlign: "right" }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Last Price</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.lastPrice.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Mean Forecast</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.mean.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Median Forecast</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.median.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Minimum</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.min.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Maximum</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.max.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Standard Deviation</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>${simulationStats.stdDev.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Chance of Profit</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>{simulationStats.probPositive}%</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #2c5364" }}>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Chance of Doubling</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>{simulationStats.probDouble}%</td>
                            </tr>
                            <tr>
                              <td style={{ padding: "0.5em", textAlign: "left" }}>Chance of Halving</td>
                              <td style={{ padding: "0.5em", textAlign: "right" }}>{simulationStats.probHalve}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: "#00c6ff", textAlign: "center" }}>
                    <p>Click the Monte Carlo tab to run the simulation.</p>
                    <button
                      onClick={runMonteCarloSimulation}
                      style={{
                        background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                        color: "#fff",
                        padding: "0.7rem 2rem",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      Run Monte Carlo Simulation
                    </button>
                  </div>
                )
              ) : (
                <div style={{ color: "#00c6ff", textAlign: "center" }}>
                  No data available for this stock.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
