import React from "react";

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
