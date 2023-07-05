import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import RecipeList, {
  loader as recipeLoader,
} from "./components/RecipeList.jsx";
import AddRecipeForm, {
  action as recipeFormAction,
} from "./components/AddRecipeForm";
import SearchResults from "./routes/SearchResults";
import EditRecipe, {
  loader as recipeEditLoader,
  action as recipeEditAction,
} from "./routes/editRecipe";
import RecipePage from "./components/RecipePage";
import { action as recipeDeleteAction } from "./routes/deleteRecipe";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RecipeList />,
        loader: recipeLoader,
      },
      {
        path: "/recipes/",
        element: <RecipeList />,
        loader: recipeLoader,
      },
      {
        path: "/recipes/:title",
        element: <RecipePage />,
      },
      {
        path: "/recipes/category/:category",
        element: <RecipeList />,
        loader: recipeLoader,
      },
      {
        path: "/recipes/category/",
        element: <RecipeList />,
        loader: recipeLoader,
      },
      {
        path: "/add-recipe",
        element: <AddRecipeForm />,
        action: recipeFormAction,
      },
      {
        path: "/recipes/search",
        element: <SearchResults />,
      },
      {
        path: "recipes/:recipeId/edit",
        element: <EditRecipe />,
        loader: recipeEditLoader,
        action: recipeEditAction,
      },
      {
        path: "recipes/:recipeTitle/delete",
        action: recipeDeleteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
