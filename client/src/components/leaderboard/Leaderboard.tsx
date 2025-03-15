import React from "react";
import "./leaderboard.css";
import { CustomerStats } from "../../types.ts";

interface CustomerTableProps {
  customers: CustomerStats[];
}

const Leaderboard: React.FC<CustomerTableProps> = ({customers}) => {
  return (
    <div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Country</th>
            <th>Total Bets</th>
            <th>Win Percentage</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.first_name + ' ' + customer.last_name}</td>
            <td>{customer.country}</td>
            <td>{customer.total_bets}</td>
            <td>{customer.win_percentage}%</td>
            <td>{customer.profit} €</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;