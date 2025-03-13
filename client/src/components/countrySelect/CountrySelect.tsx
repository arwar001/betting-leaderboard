import React from "react";
import "./countrySelect.css"

interface CountrySelectProps {
  country: string;
  onCountryChange: (country: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({country, onCountryChange}) => {

  const options: string[] = ['All', 'Estonia', 'Finland', 'Norway', 'Chile', 'Canada'];

  return (
    <>
      <label htmlFor="countries" className="dropdown-label">Select Country : </label>
      <select id="countries" value={country}
              onChange={(e) => onCountryChange(e.target.value)} className="dropdown-select">
        {options.map((option) =>
          <option value={option} className="dropdown-option">{option}</option>)
        }
      </select>
    </>
  )
};

export default CountrySelect;