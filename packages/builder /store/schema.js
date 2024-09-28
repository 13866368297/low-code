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
  const localScheme = getSchema();
  const queue = useRef([localScheme]);
  const queueIndex = useRef(0);
  const [schema, setSchema] = useState(getSchema());
  console.log(queueIndex.current, queue.current);

  const patchSchema = (partial) => {
    const newSchema = { ...schema, ...partial };
    updateSchema(newSchema);
  };

  const updateSchema = (schema, cache = true) => {
    const newSchema = cloneDeep(schema);
    if (cache) {
      queue.current = queue.current.slice(0, queueIndex.current.length);
      queue.current.push(schema);
      queueIndex.current++;
    }
    setSchema(newSchema);
  };

  const addComponent = (component, components) => {
    components.push(component);
    updateSchema(schema);
  };

  const removeComponent = (component, parents = schema.components) => {
    const index = parents.indexOf(component);
    if (index > -1) {
      parents.splice(index, 1);
    } else {
      parents.forEach((child) => {
        if (child.children) {
          removeComponent(component, child.children);
        }
      });
    }
  };

  const insertComponentFunc = (
    component,
    { referComponent, front, parents = schema.components }
  ) => {
    let index = parents.indexOf(referComponent);
    if (index > -1) {
      if (front) index -= 1;
      parents.splice(index + 1, 0, component);
    } else {
      parents.forEach((child) => {
        if (child.children) {
          insertComponentFunc(component, {
            referComponent,
            front,
            parents: child.children,
          });
        }
      });
    }
  };

  const insertComponent = (...args) => {
    insertComponentFunc(...args);
    updateSchema(schema);
  };

  const moveComponent = (component, { referComponent, front = false }) => {
    removeComponent(component);
    insertComponentFunc(component, { referComponent, front });
    updateSchema(schema);
  };

  const intoComponent = (component, parentComponent) => {
    removeComponent(component);
    parentComponent.children.push(component);
    updateSchema(schema);
  };

  const updatePropsByName = (name, props, cache) => {
    let component = schema.components.find(
      (component) => component.name === name
    );
    if (!component) {
      schema.components.forEach((item) => {
        const findComponent = item.children?.find(
          (child) => (child.name = name)
        );
        if (findComponent) {
          component = findComponent;
        }
      });
    }
    Object.assign(component.props, props);
    updateSchema(schema, cache);
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
    updateSchema,
    patchSchema,
    updatePropsByName,
    goFoward,
    goBack,
    moveComponent,
    intoComponent,
    insertComponent,
  };
}

export const useSchemaStore = createStore(useSchema);
