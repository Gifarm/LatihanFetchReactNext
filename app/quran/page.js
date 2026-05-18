"use client";
import React, { useState, useEffect } from "react";

export default function Quran() {
  const [quran, setquran] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  useEffect(() => {
    const fetchQuran = async () => {
      try {
        setloading(true);

        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        setquran(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };

    fetchQuran();
  }, []);

  const filters = quran.filter((item) =>
    item?.englishName?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-screen p-3">
      <h1 className="text-5xl text-center"> Daftar Surah</h1>

      <div className="text-center">
        <input
          type="search"
          placeholder="Masukan Nama....."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filters.map((data) => (
          <div key={data.number} className="text-center font-bold text-2xl">
            <h1 className="text-2xl text-zinc-700 mb-2">{data.englishName}</h1>
            <h1 className="text-2xl text-zinc-700">
              {data.englishNameTranslation}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
