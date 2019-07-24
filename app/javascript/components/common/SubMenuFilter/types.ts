interface SubMenuFilterOptionalParams {
  children?: SubMenuFilterItem[]
  property?: string;
}

export class SubMenuFilterItem {
  value: string;
  display: string;
  isActive: boolean;
  parent?: SubMenuFilterItem | null;
  children?: SubMenuFilterItem[];
  property?: string;

  constructor(value: string, display: string, optionalParams?: SubMenuFilterOptionalParams) {
    this.value = value;
    this.display = display;

    if(optionalParams) {
      if (optionalParams.children) this.children = optionalParams.children;
      if (optionalParams.property) this.property = optionalParams.property;
    }
  }

  activate(): void {
    this.isActive = true;
    this.children && this.children.forEach(child => child.activate());
  }

  deactivate(): void {
    this.isActive = false;
    this.children && this.children.forEach(child => child.deactivate());
    this.parent && this.parent.collapseIfNoActiveChildren();
  }

  collapseIfNoActiveChildren(): void {
    if(!this.children) return;
    this.isActive = this.children.filter(child => child.isActive).length > 0;
  }
}

export interface SubMenuFilterProps {
  structure: SubMenuFilterItem[]
  onChange: (filters: SubMenuFilterFilter[]) => void 
}

export interface SubMenuFilterFilter {
  property: string
  value: string
}