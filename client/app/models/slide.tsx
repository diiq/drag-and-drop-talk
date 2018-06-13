import { observable, computed, action } from 'mobx';
import API from 'api/api';

class SlideClass {
  @observable slide: number
  @observable disconnected = false
  channel: ActionCable.Channel

  constructor() {
    this.slide = -1;
    API.get('slide.json').then(json => {
      this.slide = json.slide;
      this.subscribe();
    });
  }

  setSlide(i: number) {
    console.log("setting")
    API.post('slide.json', { slide: i }).then(() => {
      console.log("ok")
    })
  }

  // Websocket stuff

  handlers() {
    return {
      connected: () => {

       },
      disconnected: () => {
        // If the socket is failing, fall back on polling
        this.disconnected = true;

      },
      received: (data: { event: string, slide: number }) => {
        if (data.event == "update") {
          console.log("it happened")
          this.slide = data.slide
        }
      }
    }
  }

  subscribe() {
    this.channel = API.subscribe({ channel: "SlideChannel" }, this.handlers())
  }
}

export const Slide = new SlideClass();