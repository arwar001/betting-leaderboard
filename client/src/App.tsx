import leaderboardLogo from "/leaderboard.png";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "./requests";
import type { CustomerStats } from "./types";
import CountrySelect from "./components/countrySelect/CountrySelect.tsx";
import Leaderboard from "./components/leaderboard/Leaderboard.tsx";

function App() {
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [country, setCountry] = useState('All');

  async function init() {
    const data = await fetchLeaderboard(country);
    setCustomers(data);
  }

  useEffect(() => {
    init();
  }, [country]);

  return (
    <>
      <img src={leaderboardLogo} className="logo" alt="Leaderboard logo"/>
      <h1>Betting Leaderboard</h1>
      <CountrySelect country={country} onCountryChange={setCountry}/>
      <Leaderboard customers={customers}/>
    </>
  );
}

export default App;
