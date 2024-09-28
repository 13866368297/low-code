import { useRef, useEffect } from 'react';
import { styleObjectToString } from '@lowcode/share';
import { useCanvasStore } from '../store/canvas';
import { getName } from './common';
import { useSchemaStore } from '../store/schema';
import { dragComponent, setDragComponent } from './state';

const CURSON_POSITION = {
  top: 'top',
  center: 'center',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

const CLASS_NAME = 'layout-container';

export default function Container({
  components,
  patchSchema,
  children,
  styles = {},
  horizontal,
}) {
  const containerRef = useRef();

  const { selectedComponent, setSelectedComponent } = useCanvasStore();
  const { addComponent, moveComponent, insertComponent, intoComponent } =
    useSchemaStore();

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  const addComponentFunc = (data) => {
    if (!data) return;
    const { name, type } = data;
    const newName = getName({ type, name });
    addComponent(
      {
        type,
        name: newName,
        props: {},
        children: [],
      },
      components
    );
  };

  function onDrop(e) {
    e.stopPropagation();
    let data = e.dataTransfer.getData('text/plain');
    if (data) {
      data = JSON.parse(data);
      addComponentFunc(data);
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = Array.from(containerRef.current.children);

    const onMouseDown = (e, { element, component }) => {
      e.stopPropagation();
      elements.forEach((element) => {
        element.style.boxShadow = 'none';
      });
      element.style.boxShadow = ' 0 0 0 1px rgb(255 4 4)';
      element.style.cursor = 'move';
      setSelectedComponent(component);
    };

    const onDragStart = (e, component) => {
      // const clonedElement = e.target.cloneNode(true);
      // clonedElement.style.width = '100px';
      // clonedElement.style.height = '100px';
      const image = new Image();
      e.dataTransfer.setDragImage(image, 0, 0);
      e.stopPropagation();
      setDragComponent(component);
    };

    let cursorPostion;
    const onDragOver = (e, config) => {
      e.preventDefault();
      e.stopPropagation();
      if (horizontal) {
        onHorizontalDragOver(e, config);
      } else {
        onVerticalDragOver(e, config);
      }
    };

    const onHorizontalDragOver = (e, { left, width, target }) => {
      const { clientX } = e;
      if (clientX - left < width / 2) {
        target.style.borderRight = '';
        target.style.borderLeft = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.top;
      } else {
        target.style.borderLeft = '';
        target.style.borderRight = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.bottom;
      }
    };

    const onVerticalDragOver = (e, { top, height, target }) => {
      const { clientY } = e;
      if (clientY - top < height / 2) {
        target.style.borderBottom = '';
        target.style.borderTop = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.top;
      } else {
        target.style.borderTop = '';
        target.style.borderBottom = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.bottom;
      }
    };

    const onContainerDragover = (e, { top, height, target }) => {
      e.preventDefault();
      const { clientY } = e;
      if (clientY - top < height / 3) {
        target.style.borderBottom = '';
        target.style.borderTop = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.top;
      } else if (
        clientY - top > height / 3 &&
        clientY - top < (height * 2) / 3
      ) {
        target.style.borderTop = '';
        target.style.borderBottom = '';
        cursorPostion = CURSON_POSITION.center;
      } else if (clientY - top > (height * 2) / 3) {
        target.style.borderTop = '';
        target.style.borderBottom = '2px solid #4ada00';
        cursorPostion = CURSON_POSITION.bottom;
      }
    };

    const onDragLeave = (e, element) => {
      e.stopPropagation();
      element.style.borderTop = '';
      element.style.borderBottom = '';
      element.style.borderLeft = '';
      element.style.borderRight = '';
    };

    const onDrop = (e, { element, component }) => {
      e.stopPropagation();
      element.style.borderTop = '';
      element.style.borderBottom = '';
      element.style.borderLeft = '';
      element.style.borderRight = '';
      let data = e.dataTransfer.getData('text/plain');
      if (data) {
        data = JSON.parse(data);
      }
      if (data) {
        const newComponent = {
          type: data.type,
          name: getName(data),
          props: {},
        };
        insertComponent(newComponent, {
          referComponent: component,
          front: cursorPostion === CURSON_POSITION.top,
        });
      } else {
        moveComponent(dragComponent, {
          referComponent: component,
          front: cursorPostion === CURSON_POSITION.top,
        });
      }
    };

    const onContainerDrop = (e, { element, component }) => {
      if (cursorPostion === CURSON_POSITION.center) {
        const data = e.dataTransfer.getData('text/plain');
        if (!data) {
          e.stopPropagation();
          intoComponent(dragComponent, component);
        }
        //不冒泡容器组件添加component
      } else {
        onDrop(e, { element, component });
      }
    };

    const adjustSort = (index, toIndex) => {
      const component = components.splice(index, 1)[0];
      if (index < toIndex) toIndex -= 1;
      components.splice(toIndex, 0, component);
      patchSchema({ components });
    };

    const listeners = elements.map((element, i) => {
      const isContainer = element.className === CLASS_NAME;
      element.draggable = true;
      const rect = element.getBoundingClientRect();
      const mousedown = (e) =>
        onMouseDown(e, { element, component: components[i] });
      const dragstart = (e) => onDragStart(e, components[i]);
      const dragover = (e) =>
        isContainer
          ? onContainerDragover(e, {
            target: element,
            top: rect.top,
            height: element.clientHeight,
          })
          : onDragOver(e, {
            target: element,
            top: rect.top,
            left: rect.left,
            height: element.clientHeight,
            width: element.clientWidth,
          });
      const dragleave = (e) => onDragLeave(e, element);
      const drop = (e) =>
        isContainer
          ? onContainerDrop(e, { element, component: components[i] })
          : onDrop(e, { element, component: components[i] });

      element.addEventListener('mousedown', mousedown);
      element.addEventListener('dragstart', dragstart);
      element.addEventListener('dragover', dragover);
      element.addEventListener('dragleave', dragleave);
      element.addEventListener('drop', drop);
      return () => {
        element.removeEventListener('mousedown', mousedown);
        element.removeEventListener('dragstart', dragstart);
        element.removeEventListener('drop', drop);
        element.removeEventListener('dragleave', dragleave);
        element.removeEventListener('dragover', dragover);
      };
    });

    return () =>
      listeners.forEach((listener) => {
        listener?.();
      });
  }, [components]);

  return (
    <div
      className={CLASS_NAME}
      onDrop={onDrop}
      onDragOver={onDragOver}
      ref={containerRef}
      style={styles}
    >
      {components?.map((component) => children(component))}
    </div>
  );
}
