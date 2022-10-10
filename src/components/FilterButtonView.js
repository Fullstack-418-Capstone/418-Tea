import React from 'react';


const FilterButton = ({text}) => {

    const filterStyle = {
        border:'solid',
        height:'30px',
        width:'500px'
    }


    return (
        <div style={filterStyle}>Here  is a button for {text}</div>
    )
}
export default FilterButton