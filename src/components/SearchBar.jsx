import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const SearchBar = ({ onSearchQueryChange }) => {
  SearchBar.propTypes = {
    onSearchQueryChange: PropTypes.func,
    searchQuery: PropTypes.string,
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearchQueryChange(query);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onSearchQueryChange("");
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="text"
          className="search-bar-input bg-white rounded-lg px-4 py-2 pl-10 pr-8 w-64 sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a recipe..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {searchInput ? (
          <button
            className="search-clear-button absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={handleClearSearch}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        ) : (
          <div className="search-icon absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon icon={faUtensils} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
