import { RunComponentStore, Position } from '@lowcode/components';
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
              const { layout, ...restProps } = component.props;
              return (
                <Position layout={layout}>
                  <Component
                    {...restProps}
                    {...store}
                    updateComponentStore={updateComponentStore}
                  />
                </Position>
              );
            }}
          </ComponentStore>
        );
      })}
    </div>
  );
}
