import { createStore } from 'react-global-hook-store';
import { useState, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { createSchema } from './constant';
import { SCHEMA_KEY } from '../constant';

const getSchema = () => {
  const schema = window.localStorage.getItem(SCHEMA_KEY);
  if (schema) return JSON.parse(schema);
  return createSchema();
};

function useSchema() {
  const queue = useRef([]);
  const queueIndex = useRef(0);
  const [schema, setSchema] = useState(getSchema());

  const updateSchema = (schema) => {
    queue.current = queue.current.slice(0, queueIndex.current.length);
    queue.current.push(schema);
    queueIndex.current++;
    setSchema(schema);
  };

  const addComponent = (component) => {
    const newSchema = cloneDeep(schema);
    newSchema.components.push(component);
    updateSchema(newSchema);
  };

  const updatePropsByName = (name, props) => {
    const newSchema = cloneDeep(schema);
    const component = newSchema.components.find(
      (component) => component.name === name
    );
    Object.assign(component.props, props);
    updateSchema(newSchema);
  };

  const goBack = () => {
    queueIndex.current = queueIndex.current - 1;
    if (queueIndex.current < 0) queueIndex.current = 0;
    const schema = queue.current[queueIndex.current];
    setSchema(schema);
  };

  const goFoward = () => {
    queueIndex.current = queueIndex.current + 1;
    if (queueIndex.current > queue.current.length - 1)
      queueIndex.current = queue.current.length - 1;
    const schema = queue.current[queueIndex.current];
    setSchema(schema);
  };

  return {
    schema,
    addComponent,
    updatePropsByName,
    goFoward,
    goBack,
  };
}

export const useSchemaStore = createStore(useSchema);
