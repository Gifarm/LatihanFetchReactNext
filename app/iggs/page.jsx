"use client";
import { useState, useEffect } from "react";

const API = "https://jsonplaceholder.typicode.com/posts";

export default function Iggs() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed Fetch");
        }

        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  //   const searchData = posts.filter((item) =>
  //     item?.title?.toLowerCase().includes(search(toLowerCase()),
  //   );

  const searchData = posts.filter((item) =>
    item?.title?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="min-h-screen">
        <div className="text-center">
          <input
            type="text"
            className="p-3 border rounded-2xl w-full m-3"
            value={search}
            placeholder="Masukan Judul"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2">
          {loading && <p>Loadinggg</p>}
          {searchData.map((item) => (
            <div key={item.id} className="flex m-3">
              <div className="bg-gray-500 border text-white border-black rounded-2xl p-3">
                <h1 className="">Title : {item.title}</h1>
                <h1 className="">Body : {item.body}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
