import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import ScrollableRecipes from "../components/ScrollableRecipe";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="home-page-photo flex items-center">
          <img
            className="w-full h-64 object-cover"
            src="https://www.binnys.com/globalassets/demo-kitchen-steak.jpg"
            alt="beautiful steak"
          />
        </div>
        <div className="home-page-quote flex text-justify italic my-8">
          <h1 className="m-auto text-xl flex text-center">
            When you're craving that meal in the comfort of your home
          </h1>
        </div>
        <div className="breakfast-container">
          <div className="link-page-container flex items-center">
            <Link
              className="link-to-breakfast-page flex text-center items-center m-auto text-xl my-8 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom"
              to="/recipes/category/Breakfast"
            >
              Breakfast Recipes
              <MdKeyboardDoubleArrowRight className="text-3xl" />
            </Link>
          </div>
          <div className="breakfast-recipes flex overflow-hidden relative">
            <ScrollableRecipes category="Breakfast" />
          </div>
        </div>
        <div className="lunch-container">
          <div className="link-page-container flex items-center">
            <Link
              className="link-to-lunch-page flex text-center items-center m-auto text-xl my-8 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom"
              to="/recipes/category/Lunch"
            >
              Lunch Recipes
              <MdKeyboardDoubleArrowRight className="text-3xl" />
            </Link>
          </div>
          <div className="lunch-recipes flex overflow-hidden relative">
            <ScrollableRecipes category="Lunch" />
          </div>
        </div>
        <div className="dinner-container">
          <div className="link-page-container flex items-center">
            <Link
              className="link-to-dinner-page flex text-center items-center m-auto text-xl my-8 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom"
              to="/recipes/category/Dinner"
            >
              Dinner Recipes
              <MdKeyboardDoubleArrowRight className="text-3xl" />
            </Link>
          </div>
          <div className="dinner-recipes flex overflow-hidden relative">
            <ScrollableRecipes category="Dinner" />
          </div>
        </div>
        <div className="dessert-container">
          <div className="link-page-container flex items-center">
            <Link
              className="link-to-dessert-page flex text-center items-center m-auto text-xl my-8 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-left-bottom"
              to="/recipes/category/Dessert"
            >
              Dessert Recipes
              <MdKeyboardDoubleArrowRight className="text-3xl" />
            </Link>
          </div>
          <div className="dessert-recipes flex-shrink-0 overflow-x-auto space-x-4">
            <ScrollableRecipes category="Dessert" />
          </div>
        </div>
      </div>
    </div>
  );
}
