import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";

const Body = ({ recipes }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      style={{ gridAutoRows: "1fr" }}
    >
      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex items-stretch">
          <div className="recipe-card-container">
            <RecipeCard item={recipe} />
          </div>
        </div>
      ))}
    </div>
  );
};

Body.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default Body;
