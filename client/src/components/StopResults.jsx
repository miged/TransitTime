import React from 'react';
import { useSelector } from 'react-redux';

export const StopResults = (props) => {
  const results = useSelector((state) => state.stopResults.searchResults);
  console.log(results);

  return <p>{results.length}</p>;
};