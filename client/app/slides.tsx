import * as React from 'react';
import { TitleAndText } from 'presentation/title-and-text/title-and-text';
import { TitleAndBigText } from 'presentation/title-and-big-text/title-and-big-text';
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
      title: <div>It’s kind of <br />a drag</div>,
      text: <div><p>Get out your phone, tablet, or laptop, and visit <strong>talks.sambleckley.com</strong> for live secondary content.</p>

      <p>Didn’t bring a device? Make friends with your neighbor, and look at theirs!</p></div>
    },
  },

  {
    component: TitleAndText,
    arguments: {
      title: "",
      text: <div>
        <p>Sam Bleckley<br />
        Software Engineer, Designer, and Consultant
        </p>

      <p><strong>sambleckley.com</strong><br />
      <strong>sam@sambleckley.com</strong><br />
      <strong>@diiq</strong> on Twitter</p></div>
    },
  },

  {
    component: TitleAndBigText,
    arguments: {
      title: "Problem Statement:",
      text: "Do drag and drop"
    },
  },

  {
    component: TitleAndBigText,
    arguments: {
      title: "Solution:",
      text: "There are, like, a dozen great libraries out there. Use one of those."
    },
  },
  {
    component: TitleAndBigText,
    arguments: {
      title: "Thank you.",
      text: "If there's any time left I'll take questions."
    },
  },
];

export default slides;
