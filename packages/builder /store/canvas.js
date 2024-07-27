import { createStore } from 'react-global-hook-store';
import { useState } from 'react';
import { createSchema } from './constant';

function useCanvas() {
  const [selectedComponent, setSelectedComponent] = useState();

  return {
    selectedComponent,
    setSelectedComponent,
  };
}

export const useCanvasStore = createStore(useCanvas);
