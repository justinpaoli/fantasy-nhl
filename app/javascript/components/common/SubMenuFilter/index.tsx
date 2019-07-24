import React, { FunctionComponent, useState, useEffect } from 'react';
import { SubMenuFilterProps, SubMenuFilterItem, SubMenuFilterFilter } from './types';
import { Menu } from 'semantic-ui-react';
import { flatten } from 'lodash';

const SubMenuFilter: FunctionComponent<SubMenuFilterProps> = ({ structure, onChange }) => {
  const [filters, setFilters] = useState<SubMenuFilterFilter[]>([]);
  const [items, setItems] = useState<SubMenuFilterItem[]>([]);
  
  const toggleItemActive = (item: SubMenuFilterItem): void => item.isActive ? item.deactivate() : item.activate();

  const getAllLowestChildren = (level: SubMenuFilterItem[] = items): SubMenuFilterItem[] => (
    flatten(
      level.map(item => item.children ? getAllLowestChildren(item.children) : [item])
    )
  );

  const updateActiveFilters = (): void => {
    setFilters(
      getAllLowestChildren()
        .filter(item => item.isActive && item.property)
        .map(item => ({ property: item.property, value: item.value } as SubMenuFilterFilter))
    )
  };

  useEffect(() => onChange(filters), [filters]);
  useEffect(() => setItems(structure), []);

  const generateSubMenus = (items: SubMenuFilterItem[], parent: SubMenuFilterItem | null = null): JSX.Element | null => (
    // FIXME: UI is awkward here, ideally make the component not change height once it's loaded
    <Menu.Menu>
      {flatten(
        items.map(item => {
          item.parent = parent
          return [
            <Menu.Item 
              key={`${item.value}-display`}
              active={item.isActive} 
              onClick={() => { 
                toggleItemActive(item);
                updateActiveFilters();
              }}
            >
              {item.display}
            </Menu.Item>,
            item.children && item.isActive ? 
              <Menu.Item key={item.value}>
                {generateSubMenus(item.children, item)}
              </Menu.Item> 
            : null
          ]
        })
      )}
    </Menu.Menu>
  );
  
  return (
    <Menu>
      {generateSubMenus(items)}
    </Menu>
  );
}

export default SubMenuFilter;