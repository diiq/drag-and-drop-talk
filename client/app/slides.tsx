import * as React from 'react';
import { JustText } from 'presentation/just-text/just-text.component';
import { TitleAndText } from 'presentation/title-and-text/title-and-text.component';
import { TakeHome } from 'presentation/take-home/take-home.component';


interface Slide {
  component: React.ComponentClass<{}>
  arguments: {},
  state: string,
  taskID: string
}

const slides: Slide[] = [
  {
    component: TitleAndText,
    arguments: {
      title: "Welcome",
      text: <div>Got a phone? Get it on the wifi! Keep it handy &mdash; {"you'll"} need it shortly.<br /><br /> <strong>wifi:</strong> atomic-guest-X.X<br /><strong>password:</strong> greatnotbig</div>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Welcome",
      text: "I'm Sam Bleckley. I'm a software engineer, designer, and consultant. I like trashy novels and modernist paintings."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Get Out Your Microscopes",
      text: <ol>
        <li>Look closely at just one part of your process</li>
        <li>Understand and alter it</li>
        <li>Watch <s>chaos</s> effects spread to the rest of the process</li>
      </ol>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TakeHome,
    arguments: {
      text: <ol>
        <li>Look closely at just one part of your process</li>
        <li>Understand and alter it</li>
        <li>Watch effects spread to the rest of the process</li>
      </ol>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Who Are You",
      text: "and what the heck do you want?"
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Thanks!",
      text: "I've been Sam Bleckley. Contact me at sam@climatum.com; I'd love to hear from you."
    },
    state: "contact",
    taskID: ""
  },
];

export default slides;
