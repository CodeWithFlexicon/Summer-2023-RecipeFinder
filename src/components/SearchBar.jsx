import PropTypes from "prop-types";

const SearchBar = ({ onSearchQueryChange }) => {
  SearchBar.propTypes = {
    onSearchQueryChange: PropTypes.func,
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearchQueryChange(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a recipe..."
        onChange={handleSearchInputChange}
      />
      <button className="search-button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
