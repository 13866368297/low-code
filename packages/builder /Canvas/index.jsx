import { useSchemaStore } from '../store/schema';
import { materials } from '../state';
import Interaction from './Interaction';
import { RunComponentStore, Position } from '@lowcode/components';
import Container from './Container';
import { getName } from './common';
const ComponentStore = RunComponentStore();
// import { useComponentStore } from '../store/component';
export default function Canvas() {
  const { addComponent, schema, patchSchema, updatePropsByName } =
    useSchemaStore();

  const renderContainer = ({ components, styles, horizontal }) => {
    return (
      <Container
        components={components}
        patchSchema={patchSchema}
        styles={styles}
        horizontal={horizontal}
      >
        {(component) => {
          const Component = materials[component.type]?.component;
          const isContainer = component.type === 'MContainer';
          return (
            <ComponentStore key={component.name}>
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
                      renderContainer({
                        components: component.children,
                        styles: {
                          display: 'flex',
                          minHeight: 200,
                          background: '#fff',
                          flexGrow: 0,
                        },
                        horizontal: true,
                      })
                    )}
                  </>
                );
              }}
            </ComponentStore>
          );
        }}
      </Container>
    );
  };

  return (
    <div className="canvas">
      {renderContainer({
        components: schema?.components,
        styles: { height: '100%' },
      })}
    </div>
  );
}
