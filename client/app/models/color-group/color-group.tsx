import { observable, action } from 'mobx';
import { Color } from 'models/color/color';

export class ColorGroup {
  id: string
  @observable colors: Color[]
  @observable name: string

  colorIncluded(color: Color) {
    return this.colors.some(c => c.name == color.name)
  }

  @action
  addColor(color: Color, index: number) {
    if (this.colorIncluded(color)) return;
    this.colors = [...this.colors.splice(0, index), color, ...this.colors.splice(index)]
  }

  @action
  removeColor(color: Color) {
    this.colors = this.colors.filter(c => c.name != color.name);
  }

  @action
  moveColor(color: Color, i: number) {
    const oldi = this.colors.findIndex(c => c.name == color.name);
    this.removeColor(color);
    if (i > oldi) i++
    this.colors = [...this.colors.splice(0, i), color[i], ...this.colors.splice(i)]
  }

  constructor(name: string) {
    this.name = name;
    this.colors = [];
    this.id = this.name;
  }
}