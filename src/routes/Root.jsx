import { Link, Outlet, useNavigate, redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo2.jpg";
import { useState } from "react";
import { FaUtensils, FaTimes } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform search action based on the search query
    // For example, you can navigate to a search results page with the search query as a parameter
    //navigate(`/search?query=${searchQuery}`);
    redirect(`/search?query=${searchQuery}`);

    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="root-container">
      <header className="fixed top-0 left-0 w-full bg-blue-500 shadow z-10">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
            </Link>
            <Navbar />
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-center"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUtensils className="text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder="Search"
                className="border border-gray-300 rounded py-2 px-10 focus:outline-none focus:ring focus:border-blue-300"
              />
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FaTimes
                    className="text-gray-500 cursor-pointer"
                    onClick={handleClearSearch}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white rounded ml-4 hover:bg-green-900"
            >
              <GiKnifeFork className="mr-2" />
            </button>
          </form>
        </div>
      </header>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
