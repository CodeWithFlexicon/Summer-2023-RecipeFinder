import { useState } from "react";
import PropTypes from "prop-types";

const AddRecipeForm = ({ onAddRecipe }) => {
  AddRecipeForm.propTypes = {
    onAddRecipe: PropTypes.func,
    recipes: PropTypes.array,
  };

  const initialRecipeFormState = {
    title: "",
    category: [],
    img: "",
    desc: "",
  };

  const [recipeFormState, setRecipeFormState] = useState(
    initialRecipeFormState
  );
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setRecipeFormState((prevFormState) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevFormState.category, value];
      } else {
        updatedCategories = prevFormState.category.filter(
          (category) => category !== value
        );
      }
      return {
        ...prevFormState,
        category: updatedCategories,
      };
    });
  };

  const handleAddRecipeSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});

      const newRecipe = {
        title: recipeFormState.title,
        category: recipeFormState.category,
        img: recipeFormState.img,
        desc: recipeFormState.desc,
      };

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      console.log("response: ", response);
      const savedRecipe = await response.json();
      console.log("Saved recipe: ", savedRecipe);
      onAddRecipe(savedRecipe);
      // Clear the form after submitting
      setRecipeFormState(initialRecipeFormState);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!recipeFormState.title) {
      errors.title = "Please enter a recipe name.";
    }
    if (!recipeFormState.category.length) {
      errors.category = "Please select at least one category.";
    }
    if (!recipeFormState.desc) {
      errors.desc = "Please enter a recipe description.";
    }
    if (!recipeFormState.img) {
      errors.img = "Please provide an image URL.";
    } else if (!isValidImageUrl(recipeFormState.img)) {
      errors.img = "Please provide a valid image URL.";
    }
    return errors;
  };

  const isValidImageUrl = (url) => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const categoryOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Summer",
    "Winter",
    "Autumn",
    "Spring",
  ];

  return (
    <form
      onSubmit={handleAddRecipeSubmit}
      className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
    >
      <h1 className="text-2xl my-4 font-semibold">Add Your Recipe</h1>
      <div className="mb-4">
        <label htmlFor="recipe-name" className="block mb-1">
          Recipe Name
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          id="recipe-name"
          value={recipeFormState.title}
          className={`w-full px-3 py-2 border ${
            formErrors.title ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {formErrors.title && (
          <p className="text-red-500 text-sm">{formErrors.title}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Recipe Category</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categoryOptions.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                name="category"
                value={category}
                checked={recipeFormState.category.includes(category)}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>
        {formErrors.category && (
          <p className="text-red-500 text-sm">{formErrors.category}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Recipe Description</label>
        <textarea
          onChange={handleInputChange}
          type="text"
          name="desc"
          id="recipe-desc"
          className={`w-full px-3 py-2 border ${
            formErrors.desc ? "border-red-500" : "border-gray-300"
          } rounded`}
          value={recipeFormState.desc}
        />
        {formErrors.desc && (
          <p className="text-red-500 text-sm">{formErrors.desc}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="recipe-img" className="block mb-1">
          Recipe Image (URL)
        </label>
        <input
          onChange={handleInputChange}
          type="url"
          name="img"
          id="recipe-img"
          value={recipeFormState.img}
          className={`w-full px-3 py-2 border ${
            formErrors.img ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {formErrors.img && (
          <p className="text-red-500 text-sm">{formErrors.img}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
