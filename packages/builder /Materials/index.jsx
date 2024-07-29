import { materials } from '../state';

export default function Materials() {
  const onDragStart = (ev, type) => {
    ev.dataTransfer.setData('text/plain', type);
  };

  return (
    <div className="materials">
      {Object.values(materials).map((material) => {
        return (
          <div
            key={material.type}
            draggable="true"
            onDragStart={(ev) => onDragStart(ev, material.type)}
          >
            {material.icon}
          </div>
        );
      })}
    </div>
  );
}
