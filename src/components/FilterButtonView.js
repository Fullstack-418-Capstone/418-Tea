import React from 'react';


const FilterButton = ({filter, setFilterWord, title}) => {
    
    const filterStyle = {
        border:'solid',
        borderRadius:'25px',
        backgroundColor:"rgb(216,191,216)",
        padding: '3px',
        margin: '5px',
        minWidth:'150px',
        textAlign:"center"
    }
    const handleClick = () => {
        if(filter === "tea"){
            setFilterWord(["loose", "bagged"])
        } else if(filter === "ware"){
            setFilterWord(["cup", "set", "pot"])
        } else {
        setFilterWord(filter)
        }
    }

    return (
        <div style={filterStyle} onClick={() => {handleClick()}}>{title}</div>
    )
}
export default FilterButton