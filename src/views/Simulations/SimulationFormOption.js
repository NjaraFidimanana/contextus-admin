import React, { Component } from 'react';
import $ from 'jquery';
function SimulationFormOption(props) {
    let result= Object.keys(props.rules).map((index) => {
                             const rule = props.rules[index];

                            return ( <option value={rule.contextId} >{rule.designation}</option>)
              
                            })
                         
    return result;
                           
}
export default SimulationFormOption;