import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = ({ selectedCategory }) => {
  Navbar.propTypes = {
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func,
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /*   const [showAddRecipeForm, setShowAddRecipeForm] = useState(false); // Track whether to show the AddRecipeForm */

  const options = [
    { value: "", label: "All Categories" },
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dessert", label: "Dessert" },
  ];

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  /*   const handleAddRecipeClick = () => {
    setShowAddRecipeForm(true);
  };

  const handleCloseForm = () => {
    setShowAddRecipeForm(false);
  }; */

  return (
    <>
      <div className="navbar flex items-center">
        <div
          className={`dropdown ${isDropdownOpen ? "open" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="dropdown-toggle text-md">
            Categories
            <FontAwesomeIcon className="mx-2" icon={faCaretDown} />
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
                  >
                    <Link to={`/recipes/${option.value}`}>{option.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link to="/add-recipe" className="add-recipe mx-10 text-md">
          Add Recipe
        </Link>
      </div>
    </>
  );
};

export default Navbar;
