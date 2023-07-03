import "../styles.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeCard = ({ item }) => {
  const category = Array.isArray(item.category)
    ? item.category.join(" ")
    : item.category;

  RecipeCard.propTypes = {
    item: PropTypes.object,
  };

  return (
    <Link to={`/recipes/${item.title.toLowerCase().replace(/ /g, "-")}`}>
      <div className="recipe-card rounded-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom">
        <img
          className="w-full h-48 object-cover object-fill flex-shrink-0"
          src={item.img}
          alt={item.title}
        />
        <div className="flex flex-col h-full">
          <div className="flex-grow flex flex-col">
            <div className="recipe-desc-content p-4 bg-white flex-grow flex flex-col">
              {" "}
              {/* Modified */}
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
    </Link>
  );
};

export default RecipeCard;
