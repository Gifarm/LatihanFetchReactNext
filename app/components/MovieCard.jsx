export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <img
        src={
          movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450"
        }
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{movie.title}</h2>
        <p className="text-gray-500">{movie.Year}</p>
      </div>
    </div>
  );
}
