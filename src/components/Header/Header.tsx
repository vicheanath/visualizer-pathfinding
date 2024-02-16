import React from "react";
import { Link } from "react-router-dom";
import "./Header.module.scss";
import { PiGraph,PiSortAscendingBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";



const navItems = [
  {
    id: 1,
    name: "Graph",
    path: "/graph",
    icon: <PiGraph />,
  },
  {
    id: 2,
    name: "Sort",
    path: "/sort",
    icon: <PiSortAscendingBold />,
  },
  {
    id: 3,
    name: "Search",
    path: "/search",
    icon: <IoSearch />,
  },
];

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
