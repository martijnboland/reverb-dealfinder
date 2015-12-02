export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export function changeLayout(layout) {
  return {
    type: CHANGE_LAYOUT,
    layout: layout
  }
}