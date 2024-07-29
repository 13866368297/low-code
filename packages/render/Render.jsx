import { RunComponentStore } from '@lowcode/components';
const ComponentStore = RunComponentStore();

export default function Render({ schema, materials }) {
  return (
    <div className="render">
      {schema?.components.map((component) => {
        const Component = materials[component.type]?.component;
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
      })}
    </div>
  );
}
