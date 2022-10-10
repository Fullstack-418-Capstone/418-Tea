import React from 'react';


const FilterButton = ({text, setFilterWord}) => {
    
    const filter = text

    const filterStyle = {
        border:'solid',
        height:'30px',
        width:'500px'
    }
    const handleClick = () => {
        console.log('setting filter to', text)
        if(filter === "tea"){
            setFilterWord(["loose", "bagged"])
        } else if(filter === "ware"){
            setFilterWord(["cup", "set", "pot"])
        }else{
        setFilterWord(text)
        }
    }

    return (
        <div style={filterStyle} onClick={() => {handleClick()}}>Here  is a {filter} Filter</div>
    )
}
export default FilterButton