import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({
  logo,
  selectedCategory,
  onCategorySelect,
  onSearchQueryChange,
  showModal,
  resetSearchQuery,
}) => {
  Header.propTypes = {
    logo: PropTypes.string,
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
    showModal: PropTypes.func,
    resetSearchQuery: PropTypes.func,
  };

  const handleCategorySelect = (category) => {
    // Reset the search query when a category is selected
    resetSearchQuery();
    onCategorySelect(category);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 shadow z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <Link to={"/"}>
            <Logo logo={logo} />
          </Link>
          <Navbar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            showModal={showModal}
          />
        </div>

        <SearchBar onSearchQueryChange={onSearchQueryChange} />
      </div>
    </header>
  );
};

export default Header;
