import "./styles.css";
import { useState } from "react";
import Recipes from "./Recipes.js";
import logo from "./assets/logo2.jpg";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import RandomRecipe from "./components/RandomRecipe";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = Recipes.filter((recipe) => {
    const recipeCategories = recipe.category || [];
    const isMatchedCategory =
      !selectedCategory || recipeCategories.includes(selectedCategory);
    const isMatchedSearchQuery =
      !searchQuery ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

    return isMatchedCategory && isMatchedSearchQuery;
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const shouldDisplayRandomRecipe = !selectedCategory && searchQuery === "";

  return (
    <div>
      <Header
        logo={logo}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearchQueryChange={handleSearchQueryChange}
      />
      {shouldDisplayRandomRecipe && (
        <div className="recipe-of-the-day">
          <h1 className="recipe-of-the-day-title text-bold text-center text-4xl m-4">
            Recipe of the Day
          </h1>
          <RandomRecipe recipes={Recipes} />
        </div>
      )}
      <div className="body-container">
        <h1 className="recipes-title text-bold text-center text-4xl m-4">
          Recipes
        </h1>
        <Body recipes={filteredRecipes} />
      </div>
    </div>
  );
}

export default App;
