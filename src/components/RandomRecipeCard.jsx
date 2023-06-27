import PropTypes from "prop-types";
import "../styles.css";

const RandomRecipeCard = ({ item }) => {
  const category = Array.isArray(item.category)
    ? item.category.join(" ")
    : item.category;

  RandomRecipeCard.propTypes = {
    item: PropTypes.object,
  };

  return (
    <div className="random-recipe-card rounded-lg overflow-hidden flex flex-col">
      <img
        className="w-1/2 h-auto object-cover"
        style={{ aspectRatio: "16/9" }}
        src={item.img}
        alt={item.title}
      />
      <div className="overflow-hidden bg-white w-1/2 flex flex-col justify-center">
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 line-clamp-4">{item.desc}</p>
        </div>
        <div className="bg-blue-200 px-4 py-2 flex justify-between">
          <span className="text-gray-800 font-bold">{category}</span>
          <span className="text-gray-600">{item.price}</span>
        </div>
      </div>
    </div>
  );
};

RandomRecipeCard.propTypes = {
  item: PropTypes.object,
};

export default RandomRecipeCard;
