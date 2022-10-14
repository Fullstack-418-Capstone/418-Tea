import React from "react";

const FilterButton = ({ filter, setFilterWord, title }) => {
  const filterStyle = {
    border: "solid",
    borderRadius: "25px",
    borderColor: "#2A4747",
    backgroundColor: "#439775",
    padding: "3px",
    margin: "5px",
    minWidth: "150px",
    textAlign: "center",
    color: "white",
  };
  const handleClick = () => {
    if (filter === "tea") {
      setFilterWord(["loose", "bagged"]);
    } else if (filter === "ware") {
      setFilterWord(["cup", "set", "pot"]);
    } else {
      console.log("setting filter to", filter);
      setFilterWord(filter);
    }
  };

  return (
    <div
      style={filterStyle}
      onClick={() => {
        handleClick();
      }}
    >
      {title}
    </div>
  );
};
export default FilterButton;
