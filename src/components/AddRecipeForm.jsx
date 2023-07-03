import { useState } from "react";
import { Form, redirect } from "react-router-dom";

export async function action(recipeData) {
  try {
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error("Could not save recipe data.");
    }

    const savedRecipe = await response.json();

    console.log("Saved Recipe: ", savedRecipe);
  } catch (err) {
    console.error(err);
  }
}

const AddRecipeForm = () => {
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCategories((prevCategories) => [...prevCategories, selectedCategory]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== selectedCategory)
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create recipe object with form data including selected categories
    const recipeData = {
      title: event.target.elements.title.value,
      category: categories,
      desc: event.target.elements.desc.value,
      img: event.target.elements.img.value,
    };

    // Call the action function to save recipe data and perform necessary actions
    await action(recipeData);

    // Redirect to the recipes page
    return redirect("/recipes");
  };

  return (
    <Form
      method="post"
      className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-2xl my-4 font-semibold">Add Your Recipe</h1>
      <div className="mb-4">
        <label htmlFor="recipe-name" className="block mb-1">
          Recipe Name
        </label>
        <input
          type="text"
          name="title"
          id="recipe-name"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Recipe Category</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <label>
            <input
              type="checkbox"
              name="category"
              value="Breakfast"
              onChange={handleCategoryChange}
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Lunch"
              onChange={handleCategoryChange}
            />
            Lunch
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Dinner"
              onChange={handleCategoryChange}
            />
            Dinner
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="Dessert"
              onChange={handleCategoryChange}
            />
            Dessert
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Recipe Description</label>
        <textarea
          type="text"
          name="desc"
          id="recipe-desc"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="recipe-img" className="block mb-1">
          Recipe Image (URL)
        </label>
        <input
          type="url"
          name="img"
          id="recipe-img"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Recipe
      </button>
    </Form>
  );
};

export default AddRecipeForm;
