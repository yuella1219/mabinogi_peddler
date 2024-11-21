import React from 'react';
import { Link } from 'react-router-dom';

export const Gnb = () => {
  return (
    <nav>
      <Link className="nav-btn" to="/public">0101</Link>
      <Link className="nav-btn" to="/page02">0202</Link>
    </nav>
  );
};
