import { useState } from "react";

/* 
    This is a convenienece hook that returns the current loading state 
    and a method for initializing a request.
*/

export default function useLoading(initialState) {
  const [loadingState, setLoadingState] = useState({
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
