import "./styles.css";
import { useState } from "react";
import Recipes from "./Recipes.js";
import logo from "./assets/logo2.jpg";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";

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

  return (
    <div>
      <Header
        logo={logo}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <div className="body-container">
        <Body recipes={filteredRecipes} />
      </div>
    </div>
  );
}

export default App;
