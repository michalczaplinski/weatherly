import React from "react";

export default function useLoading(initialState) {
  const [loadingState, setLoadingState] = React.useState({
    isLoading: true,
    hasError: false,
    response: null
  });

  const loadPromise = aPromise => {
    return aPromise
      .then((response, ...args) => {
        setLoadingState({ isLoading: false, hasError: false, response });
        return Promise.resolve(response, ...args);
      })
      .catch((...args) => {
        setLoadingState({ isLoading: false, hasError: true });
        return Promise.reject(...args);
      });
  };

  return { loadingState, setLoadingState, loadPromise };
}
