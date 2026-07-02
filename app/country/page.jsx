"use client";
import React, { useState, useEffect } from "react";

const API = "https://restcountries.com/v3.1/name/indonesia";

export default function Country() {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGES = 10;

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);

        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed Fetch");
        }

        const data = await res.json();

        console.log(data);
        setCountry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);
  return (
    <>
      <div className="min-h-screen p-3">
        <div className="">
          <h1 className="font-bold text-5xl p-4 mb-3 text-center">
            Indonesia Country
          </h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500 mt-5 font-medium">{error}</p>}
          {country.map((item) => (
            <div
              key={item.tld}
              className="w-[768px] border border-2xl rounded-2xl text-center"
            >
              <h1 className="text-2xl p-3 font-medium">{item.name.common}</h1>
              <p className="p-3 font-medium">{item.altSpellings}</p>
              <p className="p-3 font-medium">
                Link png : {item.coatOfArms.png}
              </p>
              <p className="p-3 font-medium">
                {" "}
                Translate Dalam Bahasa arab: {item.translations.ara.common}
              </p>
              <p className="p-3 font-medium">{item.name.common}</p>
            </div>
          ))}
        </div>
      </div>
      <h1>Haloo</h1>
    </>
  );
}
