import React from "react";

const Dropdown = (props) => {
    return(
        <div style={{"padding": '20px 0 0 20px' }}>
        <select style={{'color': 'blue', 'padding': '8px 16px', 
                'border': '1px solid transparent',
                'borderColor': 'transparent transparent rgba(0, 0, 0, 0.1) transparent'
        }} value={props.selectedMake} onChange={(e) => props.makeChange(e)}>
          <option>{props.placeholderText}</option>
          { props.make && props.make.map((item, index) => {
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
        </select>

        </div>
    )
}

export default Dropdown