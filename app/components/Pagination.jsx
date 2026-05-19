export default function Pagination({ currentPage, totalPage, onPageChange }) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-semibold">
        {currentPage} /{totalPage}
      </span>

      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
