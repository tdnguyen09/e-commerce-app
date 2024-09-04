import React from "react";
import './Pagination.css'

function Pagination ({ totalPages,currentPage, onPageChange }) {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    function handleDecrementClick (){
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }
    function handleIncrementClick () {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }
    return (
        <div id="pagination">
            <button onClick={handleDecrementClick} disabled={currentPage === 1}> &#8592;</button>
            {pageNumbers.map(number => (
                <button 
                key={number}
                onClick={() => onPageChange(number)}
                className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button onClick={handleIncrementClick} disabled={currentPage === totalPages}>&#8594;</button>
        </div>
    )
}

export default Pagination;