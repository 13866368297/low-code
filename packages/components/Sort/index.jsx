import { useRef, useEffect } from 'react';

export default function Sort({ schema, updateSchema, children }) {
  const sortContainer = useRef();

  const { selectedComponent, setSelectedComponent } = useCanvasStore();

  useEffect(() => {
    if (!sortContainer.current) return;
    const elements = Array.from(sortContainer.current.children);
    console.log('elements', elements);

    const onClick = (e, component) => {
      elements.forEach((element) => {
        element.style.border = 'none';
      });
      e.target.style.border = '1px solid red';
      setSelectedComponent(component);
    };

    let initialIndex;
    const onDragstart = (e, index) => {
      initialIndex = index;
    };

    const onDrop = (e, index) => {
      adjustSort(initialIndex, index);
    };

    const adjustSort = (index, toIndex) => {
      const component = schema.components.splice(index, 1)[0];
      schema.components.splice(toIndex, 0, component);
      console.log(index, toIndex, schema.components);
      updateSchema(schema);
    };

    const listeners = elements.map((element, i) => {
      element.draggable = true;
      const click = (e) => onClick(e, schema.components[i]);
      const dragstart = (e) => onDragstart(e, i);
      const drop = (e) => onDrop(e, i);
      element.addEventListener('click', click);
      element.addEventListener('dragstart', dragstart);
      element.addEventListener('drop', drop);
      return () => {
        element.removeEventListener('dragstart', dragstart);
        element.removeEventListener('drop', drop);
      };
    });

    return () =>
      listeners.forEach((listener) => {
        listener();
      });
  }, [schema]);

  return (
    <div className="sort-container" ref={sortContainer}>
      {schema?.components?.map((component) => children(component))}
    </div>
  );
}
