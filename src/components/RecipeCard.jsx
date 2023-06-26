import React from "react";

const RecipeCard = ({ item }) => {
  //Create a variable to check if the item has multiple categories and if so, add a space between each category
  const category = Array.isArray(item.category)
    ? item.category.join(" ")
    : item.category;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl h-full">
      <img
        className="w-full h-48 object-cover"
        src={item.img}
        alt={item.title}
      />
      <div className="overflow-hidden shadow-lg hover:shadow-xl flex flex-col h-full">
        <div className="p-4 bg-white">
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

export default RecipeCard;
