import React from 'react';
import {useLoading, useNpcName} from 'core';
import { Link } from 'react-router-dom';

export const Gnb = () => {
  const {setLoading} = useLoading();
  const {npcName} = useNpcName();
  return (
    <nav>
      {npcName.length > 0 ? (<Link className="nav-btn" to="/mabinogi_peddler" onClick={()=>{setLoading(false)}}>샵으로 돌아가기</Link>): null}      
      <Link className="nav-btn" to="/" onClick={()=>{setLoading(false)}}>지도 보기</Link>
      {/* <Link className="nav-btn" to="/road-page" onClick={()=>{setLoading(false)}}>road</Link> */}
    </nav>
  );
};
