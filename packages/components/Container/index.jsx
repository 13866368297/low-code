import React from 'react';
import './index.scss';
export default function Container({ children, layout, visible }) {
  return <div className="container">{children}</div>;
}
