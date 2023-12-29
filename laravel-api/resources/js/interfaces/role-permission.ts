export interface Role {
  id: number;
  name: string;
  display_name: string;
}

export interface Permission {
  depth: number;
  id: number;
  state: {
    checked: boolean;
    expended: boolean;
    selected: boolean;
  };
  text: string;
  nodes: Permission[];
}
