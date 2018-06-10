import { css, StyleAttribute, CSSProperties, keyframes } from 'glamor';
import { vars, centeredBox, clearfix } from 'styles/variables';


export { vars, css, centeredBox, clearfix, keyframes }

export type Style = false | StyleAttribute | CSSProperties
export type CompiledStyle = false | StyleAttribute

export type Classes = {
  [klass: string]: CSSProperties
}

export type Styles<T> = {
  [P in keyof T]: StyleAttribute
};

export function styles<T extends Classes>(classes: T): Styles<T> {
  const ret = {};
  Object.keys(classes).map(k => {
    ret[k] = css({ ...classes[k], label: k });
  });
  return ret as Styles<T>;
}
