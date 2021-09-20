import React, { Fragment } from 'react';

type TablePaginationPropsType = {
    currentPage: number,
    pages: number,
    setPage: (number: number) => void
    pageLimit: number,
}

const TablePagination = ( props:TablePaginationPropsType ) => {
    const numPages = Math.ceil(props.pages / props.pageLimit);

    const getPaginationNumbers = () => {
        const blocks = [];
        for (let i = 0; i < numPages; i++) {
            blocks.push(i);
        }
        return blocks;
    };

    const renderPageBlocks = () => {
        const getPageNumbers = getPaginationNumbers();
        return getPageNumbers.map(pageNum =>
            <a
                key={pageNum}
                onClick={() => props.setPage(pageNum)}
            >
                {pageNum}
            </a>
        );
    };

    const goToPrevPage = () => {
        if (props.currentPage > 0) {
            props.setPage(props.currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (props.currentPage < numPages - 1) {
            props.setPage(props.currentPage + 1);
        }
    };

    const renderPrevPageBlocks = () => {
        return (
            <Fragment>
                <a key="first-page"  onClick={() => props.setPage(0)}>&#171;</a>
                <a key="prev-page" onClick={goToPrevPage}>&#8592;</a>
            </Fragment>
        )
    };

    const renderNextPageBlocks = () => {
        return (
            <Fragment>
                <a key="next-page" onClick={goToNextPage}>&rarr;</a>
                <a key="last-page" onClick={() => props.setPage(numPages - 1)}>&raquo;</a>
            </Fragment>
        )
    };

    return (
        <div >
            {renderPrevPageBlocks()}
            {renderPageBlocks()}
            {renderNextPageBlocks()}
        </div>
    );
}

export default TablePagination;
