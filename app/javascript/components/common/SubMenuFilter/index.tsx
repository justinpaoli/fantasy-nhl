import React, { FunctionComponent, useState, useEffect } from 'react';
import { SubMenuFilterProps, SubMenuFilterItem, SubMenuFilterFilter } from './types';
import { Menu, Container } from 'semantic-ui-react';
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

  const generateSubMenus = (items: SubMenuFilterItem[], parent: SubMenuFilterItem | null = null): JSX.Element[] => {
    const menuItems: JSX.Element[] = [];
    items.forEach(item => {
      item.parent = parent;
      menuItems.push(
        <Menu.Item 
          key={`${item.value}-display`}
          active={item.isActive}
          onClick={() => { 
            toggleItemActive(item);
            updateActiveFilters();
          }}
        >
          {item.display}
        </Menu.Item>
      );
      if (item.children && item.isActive) menuItems.push(...generateSubMenus(item.children, item));
    })

    return menuItems;
  };
  
  return (
    <Menu fluid>
      {generateSubMenus(items)}
    </Menu>
  );
}

export default SubMenuFilter;