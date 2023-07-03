import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchSearchResults(searchQuery)
      .then((data) => {
        const filteredData = filterRecipes(data, searchQuery);
        setResults(filteredData);
      })
      .catch((error) => console.error(error));
  }, [location]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
      if (!response.ok) {
        throw new Error("Could not fetch search results.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const filterRecipes = (recipes, query) => {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4 mb-8">
        Search Results for: {searchQuery}
      </h1>
      <div className="recipe-grid grid grid-cols-4 gap-4">
        {results.map((result) => (
          <RecipeCard key={result.id} item={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
