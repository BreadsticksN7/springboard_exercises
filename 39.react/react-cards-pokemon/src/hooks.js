import axios from 'axios';
import { useState, useEffect } from 'react';

function useFlip(initialState = true) {
  const [isFlipped, setFlipped] = useState(initialState);
  const flip = () => {
    setFlipped(isUp => !isUp);
  };
  return [isFlipped, flip];
}

function useAxios(key, url) {
  const [responses, setResponses] = useLocalStorage(key);

  const addCard = async (formatter = data => data, restOfUrl = "") => {
    const res = await axios.get(`${url}${restOfUrl}`);
    setResponses(data => [...data, formatter(res.data)]);
  };

  const clearResponses = () => setResponses([]);
  
  return [responses, addCard, clearResponses];
}

function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}


export { useFlip, useAxios, useLocalStorage };
