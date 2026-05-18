"use client";

import React, { useState, useEffect } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState("");
  const PAGE = 32;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        if (!res.ok) {
          throw new Error("Terjadi kesalahn fetch");
        }
        const data = await res.json();
        console.log(data.moves);
        setPokemon(data.moves);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredPokemon = pokemon.filter((item) =>
    item?.move.name?.toLowerCase().includes(debounce.toLowerCase()),
  );

  const indexLast = currentPage * PAGE;
  const indexFirst = indexLast - PAGE;
  const currentPokemon = filteredPokemon.slice(indexFirst, indexLast);

  const amountPage = Math.ceil(filteredPokemon.length / PAGE);

  return (
    <div className="min-h-screen p-3 text-center">
      {loading && <p>Loading....</p>}
      <input
        type="search"
        placeholder="Search Data..."
        value={search}
        className="w-full p-3 mt-2 mb-2  border border-blue-400 rounded-2xl focus:outline-none focus:border-blue-800 translation-all duration-300 ease-in-out"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-3">
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {currentPokemon.map((item) => (
          <div
            key={item.move.name}
            className="bg-gray-200 border border-blue-300 rounded-2xl"
          >
            <h1>Move Name : {item.move.name}</h1>
            <p>Url : {item.move.url}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {Array.from({ length: amountPage }, (_, index) => (
          <button
            className="bg-gray-500 p-3 border border-gray-800 rounded-2xl"
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
