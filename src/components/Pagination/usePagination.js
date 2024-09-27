import { useState } from "react";

function usePagination (totalProducts) {
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 20

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = totalProducts.slice(indexOfFirstProduct,indexOfLastProduct)

    const totalPages = Math.ceil(totalProducts.length / productsPerPage)
    function paginate (pageNumber) {
        setCurrentPage(pageNumber)
    }
    return {
        currentProducts,
        totalPages,
        currentPage,
        paginate
    }
}

export default usePagination;