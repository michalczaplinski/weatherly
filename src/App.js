import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const initialSuggestions = { features: [] };
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const getSuggestions = value => {
    if (value === "") {
      setSuggestions(initialSuggestions);
      return;
    }
    axios
      .post(`/.netlify/functions/get-suggestion?query=${value}`)
      .then(res => {
        console.log(res.data);
        setSuggestions(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <input
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value);
          getSuggestions(e.target.value);
        }}
      />
      <div>response</div>
      <ul>
        {suggestions.features.map(feature => (
          <li> {feature.place_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
