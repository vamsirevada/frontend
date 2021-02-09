import React, { useState } from "react";
import { SearchContext } from "./search.context";

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState([]);

  const Addsearch = (item) => {
    if (item) {
      let array = [];
      array.push(item);

      if (array.length > 0) {
        setSearch(...array);
      }
    }
  };

  const clearSearch = () => {
    setSearch([]);
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        Addsearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
