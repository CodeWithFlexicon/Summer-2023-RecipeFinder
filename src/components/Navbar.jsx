import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles.css";

const Navbar = ({ selectedCategory, onCategorySelect }) => {
  Navbar.propTypes = {
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func,
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: "", label: "All Categories" },
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dessert", label: "Dessert" },
  ];

  const handleCategorySelect = (category) => {
    setIsDropdownOpen(false);
    onCategorySelect(category);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div
        className={`dropdown ${isDropdownOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dropdown-toggle">
          Categories
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isDropdownOpen && (
          <div className="popup-box">
            <ul className="category-list">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`category-item ${
                    selectedCategory === option.value ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
