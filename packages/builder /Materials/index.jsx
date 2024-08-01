import { materials } from '../state';
import './index.scss';

export default function Materials() {
  const onDragStart = (ev, { name, type }) => {
    const data = JSON.stringify({ name, type });
    ev.dataTransfer.setData('text/plain', data);
  };

  return (
    <div className="materials">
      {Object.values(materials).map((material) => {
        return (
          <div
            key={material.type}
            draggable="true"
            onDragStart={(ev) => onDragStart(ev, material)}
            className="material"
          >
            {material.name}
          </div>
        );
      })}
    </div>
  );
}
