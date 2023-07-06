import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "./RecipeCard";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function ScrollableRecipes({ category }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch("http://localhost:3000/recipes");
      const recipes = await response.json();
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.category.some(
          (recipeCategory) =>
            recipeCategory.toLowerCase() === category.toLowerCase()
        )
      );
      setFilteredRecipes(filteredRecipes);
    }

    fetchRecipes();
  }, [category]);

  return (
    <div className="scrollable-recipes-container">
      <div className="scrollable-recipes-wrapper">
        <div className="recipe-card-wrapper flex">
          {filteredRecipes.map((recipe, index) => (
            <div key={index} className="flex-shrink-0 w-1/6 px-4 my-8">
              <div className="recipe-card-container h-full">
                <RecipeCard item={recipe} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-arrows">
        <div className="scroll-arrow left">
          <MdKeyboardArrowLeft />
        </div>
        <div className="scroll-arrow right">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
}
