import * as MaterialList from '@lowcode/materials';

export default function Materials() {
  const onDragStart = (ev, type) => {
    ev.dataTransfer.setData('text/plain', type);
  };

  return (
    <div className="materials">
      {Object.values(MaterialList).map((material) => {
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
