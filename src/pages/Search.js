import React, { useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Downshift from "downshift";
import { Redirect } from "react-router-dom";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(50px);
  }
`;

const Layout = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 80vh;
  max-width: 700px;
  overflow: hidden;
  padding: 10px 40px;
  box-shadow: 0px 2px 5px 5px rgba(185, 185, 185, 0.2);
  transform: translateY(50px);
  animation: ${slideDown} 600ms ease-in-out;
  transition: transform 400ms ease-in-out;
  ${({ isUnmounting }) => isUnmounting && "transform: translateY(130%)"};
`;

const SearchContainer = styled.div`
  max-width: 500px;
  width: 100%;
  position: absolute;
  top: 80px;

  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  height: 80px;
  font-size: 50px;
  border: 0;
  background: transparent;
  border-bottom: 2px solid #b5b5b5;
  margin-bottom: 5px;
  outline: none;

  ::placeholder {
    color: #b5b5b5;
  }
`;

const SearchResultsContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SearchResult = styled.li`
  display: block;
  height: 70px;
  width: 100%;
  padding: 7px;
  font-size: 23px;

  :hover {
    cursor: pointer;
  }
`;

const Search = ({ history }) => {
  const initialSuggestions = { features: [] };

  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [searchText, setSearchText] = useState("");
  const [nextLocation, setNextLocation] = useState(null);
  const [transitionFinished, setTransitionFinished] = useState(false);

  const getSuggestions = query => {
    axios
      .post(`/.netlify/functions/get-suggestion`, { query })
      .then(res => {
        console.log(res.data);
        setSuggestions(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (transitionFinished) {
    return (
      <Redirect
        to={{
          pathname: nextLocation.geometry.coordinates.reverse().join(),
          state: {
            coords: nextLocation.geometry.coordinates,
            locationName: nextLocation.place_name
          }
        }}
      />
    );
  }

  return (
    // <CSSTransition mountOnEnter unmountOnExit timeout={200} in={show}>
    <Layout
      isUnmounting={!!nextLocation}
      onTransitionEnd={() => setTransitionFinished(true)}
    >
      <Downshift
        onChange={location => setNextLocation(location)}
        itemToString={item => (item ? item.place_name : "")}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          selectedItem
        }) => (
          <SearchContainer {...getRootProps()}>
            <SearchBar
              {...getInputProps()}
              autoFocus
              placeholder="Search for a location..."
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value);
                if (e.target.value.trim() === "") {
                  setSuggestions(initialSuggestions);
                  return;
                }
                getSuggestions(e.target.value.trim());
              }}
            />
            <SearchResultsContainer {...getMenuProps()}>
              {suggestions.features.map((item, index) => (
                <SearchResult
                  {...getItemProps({
                    key: item.id,
                    item,
                    index,
                    style: {
                      backgroundColor:
                        highlightedIndex === index
                          ? "rgba(0, 0, 0, .03)"
                          : "transparent"
                    }
                  })}
                  onClick={() => setNextLocation(item)}
                >
                  {item.place_name}
                </SearchResult>
              ))}
            </SearchResultsContainer>
          </SearchContainer>
        )}
      </Downshift>
    </Layout>
    // </CSSTransition>
  );
};

export default Search;
