import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";

const Header = ({
  logo,
  selectedCategory,
  onCategorySelect,
  onSearchQueryChange,
}) => {
  Header.propTypes = {
    logo: PropTypes.string,
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 shadow z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Logo logo={logo} />

        <Navbar
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />

        <SearchBar onSearchQueryChange={onSearchQueryChange} />
      </div>
    </header>
  );
};

export default Header;
