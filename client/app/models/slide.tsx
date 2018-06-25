import { observable } from 'mobx';
import API from 'api/api';

class SlideClass {
  @observable slide: number
  @observable disconnected = false
  channel: ActionCable.Channel
  poll: NodeJS.Timer | number

  constructor() {
    this.slide = -1;
    this.getSlide();
  }

  getSlide() {
    API.get('slide.json').then(json => {
      this.slide = json.slide;
      this.subscribe();
    });
  }

  setSlide(i: number) {
    API.post('slide.json', { slide: i })
  }

  // Websocket stuff

  handlers() {
    return {
      connected: () => {
        this.disconnected = false;
       },
      disconnected: () => {
        // If the socket is failing, fall back on polling
        this.disconnected = true;
        this.poll = setInterval(() => {
          if (!this.disconnected) {
            clearInterval(this.poll as any);
            return;
          }
          this.getSlide();
        }, 5000);
      },
      received: (data: { event: string, slide: number }) => {
        if (data.event == "update") {
          this.slide = data.slide
        }
      }
    }
  }

  subscribe() {
    this.channel = API.subscribe({ channel: "ApplicationCable::SlideChannel" }, this.handlers())
  }
}

export const Slide = new SlideClass();