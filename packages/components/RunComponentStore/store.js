import { useState } from 'react';
import { cloneDeep } from 'lodash';

export function useComponent() {
  const [componentStore, setComponentStore] = useState({});

  const updateComponentStore = (name, update) => {
    const store = componentStore[name] || (componentStore[name] = {});
    Object.assign(store, update);
    const newComponent = cloneDeep(componentStore);
    setComponentStore(newComponent);
  };

  return {
    componentStore,
    updateComponentStore,
  };
}

// export const useComponentStore = createStore(useComponent);