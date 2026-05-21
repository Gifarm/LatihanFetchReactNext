"use client";

import React, { useState, useEffect } from "react";

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debounce, setDebounce] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const totalPage = 5;
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://openlibrary.org/search.json?q=javascript&limit=5",
        );
        if (!res.ok) {
          throw new Error("Failed Fetch");
        }

        const data = await res.json();
        console.log(data.docs);
        setLibrary(data.docs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filtered = library.filter((item) =>
    item?.title?.toLowerCase().includes(debounce.toLowerCase()),
  );

  const lastIndex = currentPage * totalPage;
  const firstIndex = lastIndex - totalPage;

  const currentLibrary = filtered.slice(firstIndex, lastIndex);

  const amountLibrary = Math.ceil(filtered.length / totalPage);

  return (
    <>
      <div className="min-h-screen p-3">
        <h1 className="text-5xl font-bold">Data Library</h1>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search data..."
          className="bg-gray-500 px-20 pb-4 pt-4 border border-b-gray-800 rounded-2xl"
        />
        {loading ? (
          <p>Loadinggg..</p>
        ) : (
          currentLibrary.map((item) => (
            <div
              key={item.author_key}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <h1>{item.title}</h1>
            </div>
          ))
        )}

        {Array.from({ length: totalPage }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
