import { useSchemaStore } from '../store/schema';
import { materials } from '../state';

import Interaction from './Interaction';
import { RunComponentStore } from '@lowcode/components';
import { Position } from '@lowcode/components';
const ComponentStore = RunComponentStore();
// import { useComponentStore } from '../store/component';
const indexMap = {};

export default function Canvas() {
  const { addComponent, schema, updatePropsByName } = useSchemaStore();
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
    let data = ev.dataTransfer.getData('text/plain');
    if (data) {
      data = JSON.parse(data);
    }
    if (data) {
      const { type, name } = data;
      const newName = `${name}(${(indexMap[type] = indexMap[type]
        ? indexMap[type] + 1
        : 1)})`;

      addComponent({
        type,
        name: newName,
        props: {
          layout,
        },
      });
    }
  }

  return (
    <div className="canvas" onDrop={onDrop} onDragOver={onDragOver}>
      {schema.components.map((component) => {
        const Component = materials[component.type]?.component;
        return (
          <ComponentStore>
            {(componentStore, updateComponentStore) => {
              const store = componentStore[component.name] || {};
              const { layout, ...restProps } = component.props;
              return (
                <Position layout={layout}>
                  <Interaction
                    component={component}
                    updatePropsByName={updatePropsByName}
                  >
                    <Component
                      {...restProps}
                      {...store}
                      updateComponentStore={updateComponentStore}
                    />
                  </Interaction>
                </Position>
              );
            }}
          </ComponentStore>
        );
      })}
    </div>
  );
}
