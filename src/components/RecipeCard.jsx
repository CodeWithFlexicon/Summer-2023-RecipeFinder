import PropTypes from "prop-types";
import "../styles.css";

const RecipeCard = ({ item }) => {
  const category = Array.isArray(item.category)
    ? item.category.join(" ")
    : item.category;

  RecipeCard.propTypes = {
    item: PropTypes.object,
  };

  return (
    <div className="recipe-card rounded-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom">
      <img
        className="w-full h-48 object-cover"
        src={item.img}
        alt={item.title}
      />
      <div className="overflow-hidden shadow-lg hover:shadow-xl">
        <div className="p-4 bg-white">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 line-clamp-2">{item.desc}</p>
        </div>
        <div className="bg-blue-200 px-4 py-2 flex justify-between">
          <span className="text-gray-800 font-bold">{category}</span>
          <span className="text-gray-600">{item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
