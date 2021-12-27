import React, { useEffect, useState } from "react";

const OFFSET = 4

const Paginator = ({ pagination, pageChanged, totalItems }) => {

    const [pageNumbers, setPageNumbers] = useState([])

    useEffect(() => {
        const setPaginationPages = () => {
            let pages = [];
            const { last_page, current_page, to } = pagination;
            if (!to) return []
            let fromPage = current_page - OFFSET
            if (fromPage < 1) fromPage = 1
            let toPage = fromPage + OFFSET * 2
            if (toPage >= last_page) {
                toPage = last_page
            }
            for (let page = fromPage; page <= toPage; page++) {
                pages.push(page)
            }
            setPageNumbers(pages)
        }

        setPaginationPages()
    }, [pagination])

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={"page-item" + (pagination.current_page === 1 ? " disabled" : "")}>
                    <button className="page-link" onClick={() => pageChanged(1)}>
                        First
                    </button>
                </li>
                <li className={"page-item" + (pagination.current_page === 1 ? " disabled" : "")}>
                    <button className="page-link" onClick={() => pageChanged(pagination.current_page - 1)}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map((pageNumber) => {
                    return (
                        <li
                            className={
                                "page-item" + (pageNumber === pagination.current_page ? " page-item active" : "")
                            }
                            key={pageNumber}
                            onClick={() => pageChanged(pageNumber)}
                        >
                            <button className="page-link">
                                {pageNumber}
                            </button>
                        </li>
                    )
                })}

                <li className={"page-item" + (pagination.current_page === pagination.last_page ? " disabled" : "")}>
                    <button className="page-link" onClick={() => pageChanged(pagination.current_page + 1)}>
                        Next
                    </button>
                </li>
                <li className={"page-item" + (pagination.current_page === pagination.last_page ? " disabled" : "")}>
                    <button className="page-link" onClick={() => pageChanged(pagination.last_page)}>
                        Last
                    </button>
                </li>
                <span className="mt-2 ms-2">
                    <i>
                        Showing {pagination.from} - {pagination.to} of {pagination.total} entries.
                    </i>
                </span>
            </ul>
        </nav>
    )
}

export default Paginator
