import React from 'react';
import ReactDOM from 'react-dom/client';
import Builder from '@lowcode/builder';
import { Prvoider } from 'react-global-hook-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Prvoider>
    <Builder />
  </Prvoider>
);
