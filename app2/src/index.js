import React from 'react';
import ReactDOM from 'react-dom/client';
import * as materials from '@lowcode/materials';
import createBuilder from '@lowcode/builder';
import createRender from '@lowcode/render';
import { Prvoider } from 'react-global-hook-store';
import './index.scss';

const Builder = createBuilder(materials);
const Render = createRender(materials);

let schema = window.localStorage.getItem('SCHEMA_KEY');
schema = schema ? JSON.parse(schema) : null;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Prvoider>
    <Builder />
    {/* <div className="render-wrap">{schema && <Render schema={schema} />}</div> */}
  </Prvoider>
);
