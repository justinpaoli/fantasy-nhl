import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

interface SubMenuFilterOptionalParams {
  children?: SubMenuFilterItem[];
  property?: string;
  colour?: SemanticCOLORS;
}

export class SubMenuFilterItem {
  value: string;
  display: string;
  isActive: boolean;
  parent?: SubMenuFilterItem | null;
  children?: SubMenuFilterItem[];
  property?: string;
  colour?: SemanticCOLORS;

  constructor(value: string, display: string, optionalParams?: SubMenuFilterOptionalParams) {
    this.value = value;
    this.display = display;

    if(optionalParams) {
      if (optionalParams.children) this.children = optionalParams.children;
      if (optionalParams.property) this.property = optionalParams.property;
      if (optionalParams.colour) this.colour = optionalParams.colour
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
    if(this.children && !this.children.filter(child => child.isActive).length) this.isActive = false;
  }
}

export interface SubMenuFilterProps {
  structure: SubMenuFilterItem[];
  onChange: (filters: SubMenuFilterFilter[]) => void;
  label?: string;
}

export interface SubMenuFilterFilter {
  property: string;
  value: string;
}