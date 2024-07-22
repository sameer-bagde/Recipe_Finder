import React from "react";
import SearchBar from "./SearchBar";

const Search: React.FC = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-full">{<SearchBar />}</div>
      </div>
    </>
  );
};

export default Search;
