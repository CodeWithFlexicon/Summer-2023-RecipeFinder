import "../styles.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxTimer } from "react-icons/rx";

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
            <div className="recipe-desc-content p-4 bg-gray-100 flex-grow flex flex-col">
              {" "}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 line-clamp-3 recipe-desc break-words">
                {item.desc}
              </p>
            </div>
            <div className="bg-blue-200 px-4 py-2 flex justify-between items-center">
              {/*  <span className="text-gray-800 font-bold">{category}</span> */}

              <div className="text-black-600 flex items-center">
                <RxTimer />
                {item.preparation} Minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
