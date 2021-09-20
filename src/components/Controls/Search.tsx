import React from "react";

type SearchPropsType = {
    setSearchTerm: (e: string) => void
}


const Search = (props:SearchPropsType) => {
    return (
        <div className="Search">
            <input type="text" onChange={(e) => props.setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default Search;
