import { CustomerStats } from "./types";

export async function fetchLeaderboard(country: string = 'All'): Promise<CustomerStats[]> {
  try {
    const customerStats = await fetch(`http://localhost:3000/customers/leaderboard?country=${country}`, {method: 'GET'});
    return await customerStats.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}