import { useContext, } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../contextProvider.jsx";
import logo from "../../assets/logo.svg";

export default function Header() {
  const { id } = useParams();
  const { setSearch } = useContext(Context);

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="shadow sticky z-50 top-0">
      <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-around items-center mx-auto ">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="mr-8 h-12"
              alt="Logo"
            />
          </Link>
          <div
            className="justify-between items-center w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <div className={`relative text-gray-1200`}>
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none  w-auto"
                type="search"
                name="search"
                onChange={handelSearch}
                placeholder="Search"
              />
            </div>
          </div>  
          <div className="flex items-center lg:order-2">
            <Link
              to="/"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Home
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
