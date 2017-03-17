import * as React from 'react';
import { TitleAndText } from 'presentation/title-and-text/title-and-text.component';
import { Census } from 'presentation/census/census.component';
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
      text: "I'm Sam Bleckley. I'm a software engineer and consultant. I like trashy novels and modernist paintings."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: Census,
    arguments: {
      title: "Get Out Your Phones",
      question: <span>Visit <strong>talks.diiq.org/estimation</strong>. When the emoji that appears on your phone also appears here, you are connected an ready to go.</span>,
    },
    state: "mic-check",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
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
    component: Census,
    arguments: {
      title: "Financial Stakeholder",
      question: "It's your money or your business that's on the line. The buck (ought to) stop with you. You want to know when you'll have it, how much it will cost, how much it will earn.",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: Census,
    arguments: {
      title: "Financial Stakeholder",
      question: "It's your money or your business that's on the line. The buck (ought to) stop with you. You want to know when you'll have it, how much it will cost, how much it will earn.",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: Census,
    arguments: {
      title: "Product People",
      question: "Feature A or Feature B? How can we give the most to the user in the budget we have? Do we need to cut features? What do we cut? How much?",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: Census,
    arguments: {
      title: "Project Managers",
      question: "Are we on schedule? Why not? What's the new schedule?",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: Census,
    arguments: {
      title: "Designers",
      question: "If I propose this feature, am I going to get laughed out of the room? Is this feasible? Or is it easy, and I can go further?",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: Census,
    arguments: {
      title: "Engineers",
      question: "If this is late, will I get blamed? How can I kill two birds with one stone? I want to show how good I am, and also how prudent I am.",
    },
    state: "census",
    taskID: "446ed2be-6665-44ae-b48c-de41695acbb6"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "State of the Art",
      text: "What are the current best practices for estimation, both short-term and long-term?"
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "The Unstructured Meeting",
      text: "Everybody keep talking until we decide on a number. Ignore outliers."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Estimate, Talk, Estimate",
      text: <span>Everyone gives a number <em>first</em>; then we all discuss; then everyone revises their estimate. Ignore outliers, and average.</span>
    },
    state: "waiting",
    taskID: ""
  },
];

export default slides;
