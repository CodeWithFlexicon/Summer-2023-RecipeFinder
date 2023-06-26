import PropTypes from "prop-types";
import RandomRecipeCard from "./RandomRecipeCard";

const RandomRecipe = ({ recipes }) => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const randomRecipe = recipes[randomIndex];

  return (
    <div className="random-recipe">
      <div className="random-recipe-card-container">
        <RandomRecipeCard item={randomRecipe} />
      </div>
    </div>
  );
};

RandomRecipe.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RandomRecipe;
