
import * as React from 'react';
import { styles } from 'styles/css';

export interface TVProps { };

export class TV extends React.Component<TVProps, {}> {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  setRef = (r: HTMLCanvasElement) => {
    this.canvas = r;
    if (!this.canvas) return;
    this.context = this.canvas.getContext("2d")
  }

  componentDidMount() {
    this.onresize()
    window.requestAnimationFrame(this.renderTV);
  }

  scaleFactor = 2.5 // Noise size
  samples: ImageData[] = []
  sampleIndex = 0
  scanOffsetY = 0
  scanSize = 0
  FPS = 50
  scanSpeed = this.FPS * 15 // 15 seconds from top to bottom
  SAMPLE_COUNT = 10

  onresize = () => {
    this.canvas.width = this.canvas.offsetWidth / this.scaleFactor;
    this.canvas.height = this.canvas.width / (this.canvas.offsetWidth / this.canvas.offsetHeight);
    this.samples = []
    this.scanSize = (this.canvas.offsetHeight / this.scaleFactor) / 3;
    for(var i = 0; i < this.SAMPLE_COUNT; i++)
      this.samples.push(this.generateRandomSample(this.canvas.width, this.canvas.height));
  }

  interpolate(x: number, x0: number, y0: number, x1: number, y1: number) {
    return y0 + (y1 - y0)*((x - x0)/(x1 - x0));
  }

  generateRandomSample(w: number, h: number) {
    var intensity = [];
    var factor = h / 50;
    var trans = 1 - Math.random() * 0.05;

    var intensityCurve = [];
    for(var i = 0; i < Math.floor(h / factor) + factor; i++)
      intensityCurve.push(Math.floor(Math.random() * 15));

    for(var i = 0; i < h; i++) {
      var value = this.interpolate((i/factor), Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1]);
      intensity.push(value);
    }

    var imageData = this.context.createImageData(w, h);
    for(var i = 0; i < (w * h); i++) {
      var k = i * 4;
      var color = Math.floor(36 * Math.random());
      // Optional: add an intensity curve to try to simulate scan lines
      color += intensity[Math.floor(i / w)];
      imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color;
      imageData.data[k + 3] = Math.round(255 * trans);
    }
    return imageData;
  }

  renderTV = () => {
    if (!this.canvas) return;
    this.context.putImageData(this.samples[Math.floor(this.sampleIndex)], 0, 0);

    this.sampleIndex += 20 / this.FPS; // 1/FPS == 1 second
    if(this.sampleIndex >= this.samples.length) this.sampleIndex = 0;

    var grd = this.context.createLinearGradient(0, this.scanOffsetY, 0, this.scanSize + this.scanOffsetY);

    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(0.1, 'rgba(255,255,255,0)');
    grd.addColorStop(0.2, 'rgba(255,255,255,0.2)');
    grd.addColorStop(0.3, 'rgba(255,255,255,0.0)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.1)');
    grd.addColorStop(0.5, 'rgba(255,255,255,1.0)');
    grd.addColorStop(0.55, 'rgba(255,255,255,0.55)');
    grd.addColorStop(0.6, 'rgba(255,255,255,0.25)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');

    this.context.fillStyle = grd;
    this.context.fillRect(0, this.scanOffsetY, this.canvas.width, this.scanSize + this.scanOffsetY);
    this.context.globalCompositeOperation = "lighter";
    this.scanOffsetY += (this.canvas.height / this.scanSpeed);
    if(this.scanOffsetY > this.canvas.height) this.scanOffsetY = -(this.scanSize / 2);

    window.requestAnimationFrame(this.renderTV);
  }

  render() {
    return (
      <canvas {...style.tv} ref={this.setRef}></canvas>
    );
  }
}

const style = styles({
  tv: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 'translate3d(0, 0, 0)',
    WebkitPerspective: 1000
  }
})