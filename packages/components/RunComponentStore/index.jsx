import { createStore } from 'react-global-hook-store';
import { useComponent } from './store';

export function ComponentStore({ children, useComponentStore }) {
  const { componentStore, updateComponentStore } = useComponentStore();
  const component = children?.(componentStore, updateComponentStore);
  return component;
}

export default function RunComponentStore() {
  const useComponentStore = createStore(useComponent);
  return ({ children }) => (
    <ComponentStore children={children} useComponentStore={useComponentStore} />
  );
}
