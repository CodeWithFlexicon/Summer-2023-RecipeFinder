import "../styles.css";
import PropTypes from "prop-types";

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
        className="w-full h-48 object-cover object-fill"
        src={item.img}
        alt={item.title}
      />
      <div className="h-full flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="recipe-desc-content p-4 bg-white flex-grow">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 line-clamp-3 recipe-desc break-words">
              {item.desc}
            </p>
          </div>
          <div className="bg-blue-200 px-4 py-2 flex justify-between">
            <span className="text-gray-800 font-bold">{category}</span>
            <span className="text-gray-600">{item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
