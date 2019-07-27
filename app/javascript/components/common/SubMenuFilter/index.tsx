import React, { FunctionComponent, useState, useEffect } from 'react';
import { SubMenuFilterProps, SubMenuFilterItem, SubMenuFilterFilter } from './types';
import { Grid } from 'semantic-ui-react';
import { flatten } from 'lodash';

const SubMenuFilter: FunctionComponent<SubMenuFilterProps> = ({ structure, onChange, label }) => {
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

    console.log(label);
  };

  useEffect(() => onChange(filters), [filters]);
  useEffect(() => setItems(structure), []);

  const generateSubMenus = (items: SubMenuFilterItem[], parent: SubMenuFilterItem | null = null): JSX.Element[] => {
    const menuItems: JSX.Element[] = [];
    items.forEach(item => {
      item.parent = parent;
      menuItems.push(
        <Grid.Column
          key={`${item.value}-display`}
          color={item.isActive ? item.colour : undefined}
          onClick={() => { 
            toggleItemActive(item);
            updateActiveFilters();
          }}
        >
          {item.display}
        </Grid.Column>
      );
      if (item.children && item.isActive) menuItems.push(...generateSubMenus(item.children, item));
    });

    return menuItems;
  };
  
  return (
    <Grid>
      <Grid.Row columns='equal'>
        {label ? <Grid.Column color='black'>{label}</Grid.Column>  : null}
        {generateSubMenus(items)}
      </Grid.Row>
    </Grid>
  );
}

export default SubMenuFilter;