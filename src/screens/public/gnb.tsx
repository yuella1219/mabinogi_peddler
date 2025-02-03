import React from 'react';
import {useLoading} from 'core';
import { Link } from 'react-router-dom';

export const Gnb = () => {
  const {setLoading} = useLoading();
  return (
    <nav>
      <Link className="nav-btn" to="/mabinogi_peddler" onClick={()=>{setLoading(false)}}>0101</Link>
      <Link className="nav-btn" to="/map-page" onClick={()=>{setLoading(false)}}>map</Link>
      <Link className="nav-btn" to="/road-page" onClick={()=>{setLoading(false)}}>road</Link>
    </nav>
  );
};
