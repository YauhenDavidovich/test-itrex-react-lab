import React from "react";

type SearchPropsType = {
    setSearchTerm: (e: string) => void
}


const Search = (props:SearchPropsType) => {
    return (
        <div className="search">
            <input placeholder="Search by name" type="text" onChange={(e) => props.setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default Search;
