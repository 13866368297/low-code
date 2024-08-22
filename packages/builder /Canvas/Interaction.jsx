import { useCanvasStore } from '../store/canvas';
import { useRef, useEffect } from 'react';
import style from './index.scss';
export default function Interaction({
  children,
  component,
  updatePropsByName,
}) {
  const domRef = useRef();
  const { selectedComponent, setSelectedComponent } = useCanvasStore();
  const onClick = () => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    let start = false;
    let startX;
    let startY;
    let offsetX;
    let offsetY;
    const onMouseDown = (e) => {
      console.log('...onMouseDown');
      start = true;
      startX = e.pageX;
      startY = e.pageY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!start) return;
      offsetX = e.pageX - startX;
      offsetY = e.pageY - startY;
      const { layout } = component.props;
      console.log('...onMouseMove', layout, offsetX, offsetY);
      updatePropsByName(component.name, {
        layout: {
          left: layout.left + offsetX,
          top: layout.top + offsetY,
        },
      });
    };

    const onMouseUp = () => {
      console.log('...onMouseUp');
      start = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    domRef.current.addEventListener('mousedown', onMouseDown);

    return () => {
      domRef.current?.removeEventListener('mousedown', onMouseDown);
    };
  }, [component]);

  return (
    <div
      onClick={onClick}
      className={`interaction ${
        component === selectedComponent ? 'active' : ''
      }`}
      ref={domRef}
    >
      {children}
    </div>
  );
}
