import React, {useState} from 'react'

import { connectStateResults, connectRefinementList } from 'react-instantsearch-dom';


import {
    Highlight
} from 'react-instantsearch-dom';

const DynamicFilters = ({ searchResults, searchState, allSearchResults, isDynamicFactesOn, setIsDynamicFactesOn}) => {
    if (
        searchResults &&
        searchResults.userData &&
        searchResults.userData[0].facetPositions
      ) {
        setIsDynamicFactesOn(true);
        if (searchResults.userData[0].facetPositions.length > 0) {
          return searchResults.userData[0].facetPositions.map(
            ({ name }) => {
                 return isDynamicFactesOn ? (
                  <div className="filters-content">
                    <div className="title">
                      <h3>{name}</h3>
                    </div>
                    <CustomRefinementList attribute={name} />
                  </div>)    : ('')
            }
          );
        }
      }
      setIsDynamicFactesOn(false);
      return null;
}

const RefinementList = ({
    items,
    isFromSearch,
    refine,
    searchForItems,
    createURL,
  }) => 
  {
    const [name, setName] = useState(true);
  return (
    <div className="filters-content">
    <div className="title"  onClick={() => {
                    setName(!name);
                }}>
        <h3>{items.name}</h3>
        <p>-</p>
    </div>
    <ul className={`filter-list-content ${name ? 'active-filters' : 'hidden-filters'}`}>
                {items.map(item => (
                    <li className="filter-list" key={item.label}>
                        <a
                            className="button-filter"
                            href="#"
                            style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                            onClick={event => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="line"></div>
    </div>
  )};

const CustomRefinementList = connectRefinementList(RefinementList);
const DynamicFilter = connectStateResults(DynamicFilters);

export default DynamicFilter;