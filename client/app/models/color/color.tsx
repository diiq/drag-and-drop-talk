import * as chromaLib from 'chroma-js';

export class Color {
  id: string
  hex: string
  name: string
  clipped: boolean
  lch: number[]

  static fetchHuePage(hue: number) {
    const ret = [];
    for (var lightness = 100; lightness >= 0; lightness-=10) {
      for (var chrom = 0; chrom <= 110; chrom+=10) {
        ret.push(new Color(hue, chrom, lightness, 'hcl'));
      }
    }
    return ret;
  }

  static fetchRainbow(lightness: number, chroma: number) {
    const ladder = [];
    for (var hue = 0; hue < 360; hue+=10) {
      ladder.push(new Color(lightness, chroma, hue, 'lch'));
    }
    return ladder;
  }

  static hueMod(hue: number) {
    return (hue % 360 < 0) ? 360 + (hue % 360) : (hue % 360);
  }

  get hue() {
    return this.lch[2];
  }
  get lightness() {
    return this.lch[0];
  }
  get chroma() {
    return this.lch[1];
  }

  lightnessLadder() {
    let ladder = [];
    for (var lightness = 100; lightness >= 0; lightness-=10) {
      ladder.push(new Color(lightness, this.chroma, this.hue, 'lch'));
    }
    return ladder;
  }

  hueLadder() {
    let ladder = [];
    for (var hue = this.hue - 60; hue < this.hue + 60; hue+=10) {
      ladder.push(new Color(this.lightness, Color.hueMod(this.chroma), hue, 'lch'));
    }
    return ladder;
  }

  chromaLadder() {
    let ladder = [];
    for (var chroma = 0; chroma <= 120; chroma+=10) {
      ladder.push(new Color(this.lightness, chroma, this.hue, 'lch'));
    }
    return ladder;
  }

  weightedAverage(a: number, b: number, proportion: number) {
    return (a * proportion + b * (1 - proportion));
  }

  withLightness(lightness: number) {
    return new Color(lightness, this.chroma, this.hue, 'lch')
  }

  tempLadder() {
    let ladder = [];
    let [l, a, b] = this.color.lab(); l;

    for (var mix = 5; mix > 0; mix-=1) {
      ladder.push(new Color(
        this.weightedAverage(100, this.lightness, mix/5),
        a + 5 * mix,
        b + 5 * mix,
        'lab'
      ))
    }

    for (var mix = 0; mix <=5; mix+=1) {
      ladder.push(new Color(
        this.weightedAverage(0, this.lightness, mix/5),
        a - 5 * mix,
        b - 5 * mix,
        'lab'
      ).unclip())
    }
    return ladder
  }

  unclip() {
    if (!this.clipped) {
      return this;
    } else {
      return new Color(this.hex);
    }
  }

  get light() {
    return this.lightness > 60;
  }

  whiteOrBlack() {
    return (this.lightness >= 100 || this.lightness <= 0) && isNaN(this.hue) && this.chroma == 0;
  }

  complements() {
    return [
      new Color(this.lightness, this.chroma, Color.hueMod(this.hue - 120), 'lch'),
      new Color(this.lightness, this.chroma, Color.hueMod(this.hue - 60), 'lch'),
      this,
      new Color(this.lightness, this.chroma, Color.hueMod(this.hue + 60), 'lch'),
      new Color(this.lightness, this.chroma, Color.hueMod(this.hue + 120), 'lch'),
      new Color(this.lightness, this.chroma, Color.hueMod(this.hue + 180), 'lch'),
    ];
  }

  lComplements() {
    return [
      new Color(100 - this.lightness, this.chroma, Color.hueMod(this.hue - 120), 'lch'),
      new Color(100 - this.lightness, this.chroma, Color.hueMod(this.hue - 60), 'lch'),
      new Color(100 - this.lightness, this.chroma, this.hue, 'lch'),
      new Color(100 - this.lightness, this.chroma, Color.hueMod(this.hue + 60), 'lch'),
      new Color(100 - this.lightness, this.chroma, Color.hueMod(this.hue + 120), 'lch'),
      new Color(100 - this.lightness, this.chroma, Color.hueMod(this.hue + 180), 'lch'),
    ];
  }

  sketchRGB() {
    const rgb = this.color.rgba();
    return {
      red: rgb[0]/255,
      green: rgb[1]/255,
      blue: rgb[2]/255,
      alpha: 1,
    }
  }

  procreateHSL() {
    const hsl = this.color.hsv();
    return {
      hue: hsl[0]/360,
      brightness: hsl[2],
      saturation: hsl[1],
      alpha: 1,
      colorSpace: 0
    }
  }

  contrast() {
    return this.light ? this.withLightness(20) : this.withLightness(90);
  }

  get color() {
    return chromaLib(this.lch[0], this.lch[1], this.lch[2], 'lch')
  }

  constructor(..._: any[]) {
    const color = chromaLib.apply(null, arguments);
    this.lch = color.lch().map(Math.round);

    this.name = `${this.lightness}, ${this.chroma}, ${isNaN(this.hue) ? "-" : this.hue}`;
    this.id = this.name;
    this.hex = color.hex();
    this.clipped = color.clipped() && !this.whiteOrBlack();
  }
}
