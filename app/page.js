"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [surah, setsurah] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setloading(true);

        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        console.log(data);
        setsurah(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    fetchSurah();
  }, []);

  const filteredSurahs = surah.filter((item) =>
    item?.englishName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-center font-bold text-3xl mb-10 text-blue-400">
          Daftar Surah
        </h1>
        <div className="text-center">
          <input
            type="search"
            placeholder="Input Surah name..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="border rounded-4xl p-2 "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-5">
          {loading && <p>Loadinggg....</p>}
          {filteredSurahs.map((surahs) => (
            <div key={surahs.number} className="font-bold text-lg mt-3">
              <h1 className="text-2xl font-bold mb-2">{surahs.name}</h1>
              <h1 className="text-2xl font-bold mb-2">{surahs.englishName}</h1>
              <h1 className="text-2xl font-bold mb-2">
                {surahs.englishNameTranslation}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
