import * as MaterialList from '@lowcode/materials';
import { RunComponentStore } from '@lowcode/components';
const ComponentStore = RunComponentStore();

export default function Render({ schema }) {
  return schema?.components.map((component) => {
    const Component = MaterialList[component.type]?.component;
    return (
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
    );
  });
}
