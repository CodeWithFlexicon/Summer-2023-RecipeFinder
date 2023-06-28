import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";

const Body = ({ recipes }) => {
  if (recipes.length === 0) {
    // Return null when there are no recipes to display
    return null;
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      style={{ gridAutoRows: "1fr" }}
    >
      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex items-stretch">
          <div className="recipe-card-container flex-grow">
            <RecipeCard item={recipe} />
          </div>
        </div>
      ))}
    </div>
  );
};

Body.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default Body;
