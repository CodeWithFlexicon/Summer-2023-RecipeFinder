import "./styles.css";
import { useState, useEffect } from "react";
import Recipes from "./Recipes.js";
import logo from "./assets/logo2.jpg";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import RandomRecipe from "./components/RandomRecipe";
import RecipeModal from "./ui/RecipeModal";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch("http://localhost:3000/recipes");
      const recipes = await response.json();
      setRecipes(recipes);
    }

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeCategories = recipe.category || [];
    const isMatchedCategory =
      !selectedCategory || recipeCategories.includes(selectedCategory);
    const isMatchedSearchQuery =
      !searchQuery ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

    return isMatchedCategory && isMatchedSearchQuery;
  });

  const resetSearchBarInput = () => {
    const searchBarInput = document.querySelector(".search-bar-input");
    if (searchBarInput) {
      searchBarInput.value = "";
    }
  };

  //Should handle the category selection and when we change the category, we empty the search query
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    resetSearchBarInput();
  };

  //This just handles the query string
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  //Show the Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  //Hide the Modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  //When we add a new recipe, we need to add it to the list of recipes
  const onAddRecipe = (newRecipe) => {
    hideModal();

    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const shouldDisplayRandomRecipe = !selectedCategory && searchQuery === "";

  return (
    <div>
      <Header
        logo={logo}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearchQueryChange={handleSearchQueryChange}
        showModal={showModal}
        hideModal={hideModal}
        resetSearchQuery={resetSearchBarInput}
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
      <RecipeModal isVisible={isModalVisible} hideModal={hideModal}>
        <AddRecipeForm onAddRecipe={onAddRecipe} />
      </RecipeModal>
    </div>
  );
}

export default App;
