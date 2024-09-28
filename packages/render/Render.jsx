import { RunComponentStore, Position } from '@lowcode/components';
const ComponentStore = RunComponentStore();

export default function Render({ schema, materials }) {
  const renderComponents = (components) => {
    return components.map((component) => {
      const Component = materials[component.type]?.component;
      const isContainer = component.type === 'MContainer';
      return (
        <ComponentStore>
          {(componentStore, updateComponentStore) => {
            const store = componentStore[component.name] || {};
            const { layout, ...restProps } = component.props;
            return (
              <>
                {!isContainer ? (
                  <Component
                    {...restProps}
                    {...store}
                    updateComponentStore={updateComponentStore}
                  ></Component>
                ) : (
                  <Component
                    {...restProps}
                    {...store}
                    updateComponentStore={updateComponentStore}
                  >
                    {renderComponents(component.children)}
                  </Component>
                )}
              </>
            );
          }}
        </ComponentStore>
      );
    });
  };
  return <div className="render">{renderComponents(schema.components)}</div>;
}
