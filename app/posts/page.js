"use client";

import React, { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const cariPosts = posts.filter((item) =>
    item?.title?.toLowerCase().includes(debounce.toLowerCase()),
  );
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentPost = cariPosts.slice(firstIndex, lastIndex);

  const totalPage = Math.ceil(cariPosts.length / perPage);

  return (
    <div>
      <div className="min-h-screen p-3">
        <h1 className="text-5xl text-center text-amber-900 text-black">
          Daftar Dataa
        </h1>
        <input
          type="search"
          placeholder="Masukan Data yang dicarii..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm 
           focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
           focus:bg-white transition-all duration-300 ease-in-out shadow-sm m-4"
        />
        {loading && <p>Loadinggg.....</p>}
        {currentPost.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2  gap-2 p-3"
          >
            <h1 className="font-bold">
              <span>{item.id}.</span>Title : {item.title}
            </h1>
            <p className="">Body : {item.body}</p>
          </div>
        ))}
        <div className="flex gap-2 mt-5 flex-wrap justify-center">
          {Array.from({ length: totalPage }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-3 rounded cursor-pointer ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
