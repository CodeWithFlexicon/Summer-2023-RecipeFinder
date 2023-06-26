import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";

const Body = ({ recipes }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      style={{ gridAutoRows: "minmax(200px, auto)" }}
    >
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <RecipeCard item={recipe} />
        </div>
      ))}
    </div>
  );
};

Body.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default Body;
