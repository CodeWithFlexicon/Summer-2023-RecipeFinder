import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo2.jpg";

const Root = () => {
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

          <SearchBar />
        </div>
      </header>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
