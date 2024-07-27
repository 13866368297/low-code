import { useCanvasStore } from '../store/canvas';
import style from './index.scss';
export default function Interaction({ children, component }) {
  const { selectedComponent, setSelectedComponent } = useCanvasStore();
  const onClick = () => {
    setSelectedComponent(component);
  };

  return (
    <div
      onClick={onClick}
      className={`interaction ${
        component === selectedComponent ? 'active' : ''
      }`}
    >
      {children}
    </div>
  );
}
