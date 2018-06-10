const deepEqual = require('deep-equal') as (a: any, b: any) => boolean

export function camelCase(s: string) {
  return s.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function snakeCase(s: string) {
  return s.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
}

export function camelCaseObject(o: { [key: string]: any }) {
  const ret = {};
  Object.keys(o).map(k => ret[camelCase(k)] = o[k]);
  return ret;
}

export function snakeCaseObject(o: { [key: string]: any }) {
  const ret = {};
  Object.keys(o).map(k => ret[snakeCase(k)] = o[k]);
  return ret;
}

export function roundTo(n: number, fraction: number = 0.1) {
  if (!n) return;
  if (fraction == 0.1) return parseFloat(n.toFixed(1));
  return (Math.round(n / fraction) * fraction);
}

export function fixedMaybeOne(n: number) {
  return n.toFixed(1).replace('.0', '');
}

export function changed(oldO: {}, newO: {}) {
  return Object.keys(newO).filter(k => !deepEqual(oldO[k], unObservify(newO[k])))
}

export function keepChanged<T>(oldO: T, newO: T): Partial<T> {
  const keys = changed(oldO, newO);
  const out = {};
  keys.forEach(k => { out[k] = newO[k] });
  return out;
}

export function removeChanged(oldO: {}, newO: {}, filterO: {}) {
  const out = {};
  Object.keys(filterO).forEach(k => {
    if (deepEqual(oldO[k], unObservify(newO[k]))) {
      out[k] = filterO[k];
    }
  });
  return out;
}

function unObservify(x: any) {
  // We can't compare Observables and non-observables. This deep-POJOs mobx
  // objects. TODO performance
  return x ? JSON.parse(JSON.stringify(x)) : x
}

// Other people might also be reordering, etc -- so add a little bit of a jiggle
export function perturbedAverage(a: number, b: number) {
  return (a + b) / 2 + Math.random() * Math.abs(a - b) / 16;
}

export function groupBy<T>(list: T[], fn: (item: T) => string | number) {
  return list.reduce((groups, item) => {
    var val = fn(item);
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {} as {[prop: string]: T[]});
}
