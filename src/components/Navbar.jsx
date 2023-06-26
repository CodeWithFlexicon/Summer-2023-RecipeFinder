import PropTypes from "prop-types";
import Dropdown from "react-dropdown-select";

const Navbar = ({ selectedCategory, onCategorySelect }) => {
  Navbar.propTypes = {
    selectedCategory: PropTypes.string,
    onCategorySelect: PropTypes.func,
  };

  const options = [
    { value: "", label: "All Categories" },
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dessert", label: "Dessert" },
  ];

  const handleCategorySelect = (selectedOption) => {
    const category = selectedOption[0].value;
    onCategorySelect(category);
  };

  return (
    <div className="navbar">
      <Dropdown
        options={options}
        placeholder="Food Categories"
        values={[{ value: selectedCategory, label: selectedCategory }]}
        onChange={handleCategorySelect}
      />
    </div>
  );
};

export default Navbar;
