import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultVal) {
  // make piece of state based of value in local storage or defaultVal
  const [state, setState] = useState(() => {
    var val;
    try {
      val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
    } catch (e) {
      val = defaultVal;
    }
    return val;
  });
  // useEffect to update local storage
  useEffect(
    (key) => {
      window.localStorage.setItem(key, JSON.stringify(state));
    },
    [state]
  );
  return [state, setState];
}
export default useLocalStorageState;
