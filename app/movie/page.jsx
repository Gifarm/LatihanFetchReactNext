"use client";

import React, { useState, useEffect } from "react";

import Loading from "@/app/components/Loading";
import MovieCard from "@/app/components/MovieCard";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";

import useDebounce from "@/app/hooks/page";
import { fetchMovies } from "@/app/services/page";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("batman");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    async function LoadMovies() {
      try {
        setLoading(true);

        setError("");

        const data = await fetchMovies(debounceSearch, currentPage);

        setMovies(data.Search);

        setTotalPage(Math.ceil(data.totalResults / 10));
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    LoadMovies();
  }, [debounceSearch, currentPage]);
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-black font-bold mb-5">MovieApps</h1>

          <Search
            value={search}
            onChange={(e) => {
              (setSearch(e.target.value), setCurrentPage);
            }}
          />

          {error && <p className="text-red-500 mt-5 font-medium">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Loading key={index} />
                ))
              : movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
          </div>

          {!loading && movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
      ;
    </>
  );
}
