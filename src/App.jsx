import "./styles.css";
import Recipes from "./Recipes.js";
import RecipeCard from "./components/RecipeCard.jsx";
import logo from "./assets/logo2.jpg";

function App() {
  return (
    <div className="container-fluid">
      <div className="text-center my-3 flex items-center justify-center mb-20">
        <img src={logo} className="w-12 h-12 mr-2" />
        <h1 className="text-5xl font-bold">Simply Craving</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {Recipes.map((recipe) => (
          <div className="col mb-4" key={recipe.id}>
            <RecipeCard item={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
