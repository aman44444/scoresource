import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

interface AccordionProps {
  title: string;
  onFetch?: () => void;      
  children: React.ReactNode;  
}

const Accordion: React.FC<AccordionProps> = ({ title, onFetch, children }) => {
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleToggle = async () => {
    const willOpen = !open;

    setOpen(willOpen); 

    if (willOpen && onFetch) {
      setFetching(true);

      try{
        await onFetch();
      }
      finally {
        setFetching(false);
      }
    }
  };


  return (
    <div className="w-full border-b border-gray-600 ">
       <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full p-4 text-gray-400 hover:text-white"
      >
        <span className="text-sm">{title}</span>

         {fetching ? (
          <ImSpinner2
            size={18}
            className="animate-spin text-gray-400"
          />
        ) : (
          <FiChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  );
};

export default Accordion;
