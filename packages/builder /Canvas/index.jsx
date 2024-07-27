import { useSchemaStore } from '../store/schema';
import * as MaterialList from '@lowcode/materials';
import Interaction from './Interaction';
import { RunComponentStore } from '@lowcode/components';
const ComponentStore = RunComponentStore();
// import { useComponentStore } from '../store/component';
const indexMap = {};

export default function Canvas() {
  const { addComponent, schema } = useSchemaStore();
  // const { componentStore, updateComponentStore } = useComponentStore();
  function onDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }
  function onDrop(ev) {
    ev.preventDefault();

    const layout = {
      left: ev.clientX - 200,
      top: ev.clientY,
    };
    const data = ev.dataTransfer.getData('text/plain');
    const name = `${data}-${(indexMap[data] = indexMap[data]
      ? indexMap[data] + 1
      : 1)}`;

    addComponent({
      type: data,
      name,
      props: {
        layout,
      },
    });
  }

  return (
    <div className="canvas" onDrop={onDrop} onDragOver={onDragOver}>
      {schema.components.map((component) => {
        const Component = MaterialList[component.type]?.component;
        return (
          <Interaction component={component}>
            <ComponentStore>
              {(componentStore, updateComponentStore) => {
                const store = componentStore[component.name] || {};
                return (
                  <Component
                    {...component.props}
                    {...store}
                    updateComponentStore={updateComponentStore}
                  />
                );
              }}
            </ComponentStore>
          </Interaction>
        );
      })}
    </div>
  );
}
