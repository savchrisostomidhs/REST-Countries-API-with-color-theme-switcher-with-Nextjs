"use client"
import Image from "next/image";
import Link from "next/link";
import data from "./data.json";
import "./home.css"
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.currentTarget) {
      setSearch(() => e.currentTarget.value);
    }
  }

  const handleDrop = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.currentTarget) {
      setRegion(() => e.currentTarget.value);
    }
  }

  return (
    <main className="h-main">
      <div className="filter">
        <div className="search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input onChange={handleSearch} id="search" type="text" placeholder="Search for a country..." />
        </div>

        <select onChange={handleDrop} name="region" id="region">
          <option hidden defaultValue={"None"} value="None">Filter by region</option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="countries">
        {data.map((country) =>
          search === "" && (region === "" || region === "All")
            || search.toLowerCase() === country.name.substring(0, search.length).toLowerCase()
            && (region === country.region || region === "All" || region === "") ?
            <Link className="country" key={country.numericCode} href={"./" + country.numericCode}>
              <div className="image">
                <Image src={country.flags.svg} alt={country.name} width={200} height={150} />
              </div>
              <div className="dets">
                <p><strong>{country.name}</strong></p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
              </div>
            </Link> : null
        )}
      </div>
    </main>
  );
}
