import React from 'react'

const PageNavigationBar = ({currentPage,totalPages,handlePageChange}) => {
  return (
    <div className="mt-4 flex justify-center">
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      Previous
    </button>
    {[...Array(totalPages).keys()].map((page) => (
      <button
        key={page + 1}
        onClick={() => handlePageChange(page + 1)}
        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
          currentPage === page + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        {page + 1}
      </button>
    ))}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      Next
    </button>
  </nav>
</div>
  )
}

export default PageNavigationBar
