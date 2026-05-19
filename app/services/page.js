"use client";
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export async function fetchMovies(search, page = 1) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`,
  );

  if (!res.ok) {
    throw new Error("Failed Fetch");
  }
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}
