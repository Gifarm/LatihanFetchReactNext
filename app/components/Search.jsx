export default function Search({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search Movie.."
      className="w-full text-black p-3 border rounded-2xl outline-none border-blue-800 focus:border-blue-200"
    />
  );
}
