import * as React from 'react';
import { TitleAndText } from 'presentation/title-and-text/title-and-text.component';
import { Census } from 'presentation/census/census.component';
import { TakeHome } from 'presentation/take-home/take-home.component';
import { SingleEstimateHistogram } from 'presentation/single-estimate-histogram/single-estimate-histogram.component';
import { SingleEstimateOutcome } from 'presentation/single-estimate-outcome/single-estimate-outcome.component';
import { NormalEstimateHistogram } from 'presentation/normal-estimate-histogram/normal-estimate-histogram.component';
import { NormalEstimateOutcome } from 'presentation/normal-estimate-outcome/normal-estimate-outcome.component';

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
    taskID: "fcbea0fa-7951-40aa-8e5f-33344d71f4c4"
  },

  {
    component: Census,
    arguments: {
      title: "Product People",
      question: "Feature A or Feature B? How can we give the most to the user in the budget we have? Do we need to cut features? What do we cut? How much?",
    },
    state: "census",
    taskID: "0b1d2ffd-3ae0-418b-8d29-b6d8ffbc61c3"
  },

  {
    component: Census,
    arguments: {
      title: "Project Managers",
      question: "Are we on schedule? Why not? What's the new schedule?",
    },
    state: "census",
    taskID: "28cca7c7-73f4-4cf9-b345-9c043e410e95"
  },

  {
    component: Census,
    arguments: {
      title: "Designers",
      question: "If I propose this feature, am I going to get laughed out of the room? Is this feasible? Or is it easy, and I can go further?",
    },
    state: "census",
    taskID: "dcedf0ce-a5e5-4e45-8314-ce64b353e562"
  },

  {
    component: Census,
    arguments: {
      title: "Engineers",
      question: "If this is late, will I get blamed? How can I kill two birds with one stone? I want to show how good I am, and also how prudent I am.",
    },
    state: "census",
    taskID: "ed9220ed-075a-405e-9663-2de65cc29347"
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

  {
    component: TitleAndText,
    arguments: {
      title: "Try it!",
      text: <span>You are going to <strong>type 3 sentences</strong> on your phone. Estimate how long, in seconds, it will take you to do so.</span>
    },
    state: "one-number-estimate",
    taskID: "3b2deed2-6b16-467c-8827-a05c821b9891"
  },

  {
    component: SingleEstimateHistogram,
    arguments: {},
    state: "waiting",
    taskID: "3b2deed2-6b16-467c-8827-a05c821b9891"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Adjust",
      text: <span>You are going to <strong>type 3 sentences</strong> on your phone. <strong>Re</strong>stimate how long, in seconds, it will take you to do so.</span>
    },
    state: "one-number-estimate",
    taskID: "8fc07b24-14d4-45d1-a084-147e6b2d3719"
  },

  {
    component: SingleEstimateHistogram,
    arguments: {},
    state: "waiting",
    taskID: "8fc07b24-14d4-45d1-a084-147e6b2d3719"
  },

  {
    component: TakeHome,
    arguments: {
      text: <ol>
        <li>Estimate <strong>first</strong>, before discussion</li>
        <li>Discuss rationales, unknowns</li>
        <li>Allow everyone to readjust their estimates</li>
      </ol>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Ready?",
      text: <div></div>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: SingleEstimateOutcome,
    arguments: {
      text: <div><p><em>Type the following three sentences:</em></p><p><strong>She sketched one picture of Saskatchewan. <br />My shoelace has come undone, but I will ignore it for now. <br />I will remember {"Sam's"} talk fondly.</strong></p></div>
    },
    state: "type-three-sentences",
    taskID: "8fc07b24-14d4-45d1-a084-147e6b2d3719"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "The 50/90",
      text: <span>okokokokok</span>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Try it!",
      text: <span>You are going to <strong>DO A THING.</strong> How many seconds should we give you to believe you can finish the task half of the time? How many seconds should we give you to be 90% confident you can finish the task?</span>
    },
    state: "two-number-estimate",
    taskID: "3b2deed2-6b16-467c-8827-a05c821b9891"
  },

  {
    component: NormalEstimateHistogram,
    arguments: {
      title: "Your Average 50/90"
    },
    state: "waiting",
    taskID: "8fc07b24-14d4-45d1-a084-147e6b2d3719"
  },

  {
    component: NormalEstimateOutcome,
    arguments: {
      title: "Your Average 50/90"
    },
    state: "waiting",
    taskID: "8fc07b24-14d4-45d1-a084-147e6b2d3719"
  },
];

export default slides;
