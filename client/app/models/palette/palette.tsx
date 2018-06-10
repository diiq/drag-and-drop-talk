import { action, computed, observable } from "mobx";
import { ColorGroup } from "models";
import { Color } from "models/color/color";


export class Palette {
  static currentPaletteStore: CurrentPaletteStore
  @observable groups: ColorGroup[] = []

  @computed
  static get current() {
    return this.currentPaletteStore.currentPalette;
  }

  constructor() {
    this.reset();
  }

  save() {
    localStorage.setItem("palette", this.toJson());
  }

  reload() {
    if (!localStorage.getItem("palette")) return;
    try {
      this.load(JSON.parse(localStorage.getItem("palette")));
    } catch (e) {

    }
  }

  load(json: {groups: {name: string, colors: string[]}[]}) {
    this.groups = json.groups.map(g => {
      const ng = new ColorGroup(g.name);
      ng.colors = g.colors.map(c => new Color(c));
      return ng;
    })
  }

  toJson() {
    return JSON.stringify({
      groups: this.groups.map(g => {
        return {
          name: g.name,
          colors: g.colors.map(c => c.hex)
        };
      })
    })
  }

  reset() {
    this.groups = [new ColorGroup("Theme"), new ColorGroup("Success"), new ColorGroup("Warning"), new ColorGroup("Grays")];
  }

  @action addGroup(name: string) {
    this.groups.push(new ColorGroup(name));
  }

  @action removeGroup(group: ColorGroup) {
    this.groups = this.groups.filter(g => g != group);
  }

  text() {
    return this.groups.map(g => {
      return `${g.name}:
` + g.colors.map(c => c.hex).join("\n");
    }).join("\n\n");
  }

  sketch() {
    return {
      compatibleVersion: "2.0",
      pluginVersion: "2.14",
      gradients: [] as any[],
      images: [] as any[],
      colors: Array.prototype.concat.apply([], this.groups.map(g => g.colors.map(c => c.sketchRGB())))
    }
  }

  procreate() {
    return [{
      name: `Palette ${Math.floor(Math.random()*100)}`,
      swatches: Array.prototype.concat.apply([], this.groups.map(g => {
        var ret = g.colors.map(c => c.procreateHSL())
        ret.push(null);
        return ret;
      }))
    }]
  }
}

// Workaround because mobx can't handle static properties right now.
class CurrentPaletteStore {
  @observable currentPalette: Palette

  constructor() {
    this.currentPalette = new Palette();
    this.currentPalette.reload();
  }
};

Palette.currentPaletteStore = new CurrentPaletteStore();
