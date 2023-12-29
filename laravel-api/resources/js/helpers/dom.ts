export const getTreeNodesData = (nodes: any[]): number[] => {
  let arr: number[] = [];
  nodes.forEach((node) => {
    if (node.state && node.state.checked) {
      arr.push(node['id']);
    }
    if (node.nodes && node.nodes.length) arr = arr.concat(getTreeNodesData(node.nodes));
  });

  return arr;
};
