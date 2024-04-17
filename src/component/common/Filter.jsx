import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { typeData } from "../../Const";

const List = styled.div`
  display: block;
`;


const Filter = ({ setType }) => {
  const [isFilterOpen, setisFilterOpen] = useState(false);
  let ref = useRef(null);
  useEffect(() => {
    let handeler = (e) => {
      if (!ref.current.contains(e.target)) {
        setisFilterOpen(false);
      }
    };
    window.addEventListener("mousedown", handeler);
  });
  return (
    <div ref={ref} className="mt-5 flex items-center justify-center z-10 mr-10">
      <div className="relative group">
        <button
          id="dropdown-button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
          onClick={() => setisFilterOpen(!isFilterOpen)}
        >
          <span className="mr-2">Category</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
          </svg>
        </button>
        {isFilterOpen && (
          <div
            id="dropdown-menu"
            className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 h-[50vh] overflow-y-scroll"
          >
            {typeData.map((list, i) => {
              return (
                <List
                  key={i}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md mr-5"
                  onClick={() => {
                    setType(list);
                    setisFilterOpen(false);
                  }}
                >
                  {list}
                </List>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
