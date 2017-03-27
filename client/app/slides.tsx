import * as React from 'react';
import { JustText } from 'presentation/just-text/just-text.component';
import { TitleAndText } from 'presentation/title-and-text/title-and-text.component';
import { TitleTextAndImage } from 'presentation/title-text-and-image/title-text-and-image.component';
import { Census } from 'presentation/census/census.component';
import { TakeHome } from 'presentation/take-home/take-home.component';
import { SingleEstimateHistogram } from 'presentation/single-estimate-histogram/single-estimate-histogram.component';
import { SingleEstimateOutcome } from 'presentation/single-estimate-outcome/single-estimate-outcome.component';
import { NormalEstimateHistogram } from 'presentation/normal-estimate-histogram/normal-estimate-histogram.component';
import { NormalEstimateOutcome } from 'presentation/normal-estimate-outcome/normal-estimate-outcome.component';
import { LogNormalEstimateHistogram } from 'presentation/log-normal-estimate-histogram/log-normal-estimate-histogram.component';
import { LogNormalEstimateOutcome } from 'presentation/log-normal-estimate-outcome/log-normal-estimate-outcome.component';


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
      text: "I'm Sam Bleckley. I'm a software engineer, designer, and consultant. I like trashy novels and modernist paintings."
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
    taskID: "mic-check"
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
    taskID: "stakeholder-census"
  },

  {
    component: Census,
    arguments: {
      title: "Product People",
      question: "Feature A or Feature B? How can we give the most to the user in the budget we have? Do we need to cut features? What do we cut? How much?",
    },
    state: "census",
    taskID: "product-census"
  },

  {
    component: Census,
    arguments: {
      title: "Project Managers",
      question: "Are we on schedule? Why not? What's the new schedule?",
    },
    state: "census",
    taskID: "pm-census"
  },

  {
    component: Census,
    arguments: {
      title: "Designers",
      question: "If I propose this feature, am I going to get laughed out of the room? Is this feasible? Or is it easy, and I can go further?",
    },
    state: "census",
    taskID: "designer-census"
  },

  {
    component: Census,
    arguments: {
      title: "Engineers",
      question: "If this is late, will I get blamed? How can I kill two birds with one stone? I want to show how good I am, and also how prudent I am.",
    },
    state: "census",
    taskID: "engineer-census"
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
      text: <span>You are going to <strong>type 3 sentences</strong> on your phone. I will provide the sentences up here, as a slide. Estimate how long, in seconds, it will take you to do so.</span>
    },
    state: "one-number-estimate",
    taskID: "type-three-sentences-a"
  },

  {
    component: SingleEstimateHistogram,
    arguments: {},
    state: "waiting",
    taskID: "type-three-sentences-a"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Adjust",
      text: <span>You are going to <strong>type 3 sentences</strong> on your phone. I will provide the sentences up here, as a slide. <strong > Re</strong>stimate how long, in seconds, it will take you to do so.</span>
    },
    state: "one-number-estimate",
    taskID: "type-three-sentences-b"
  },

  {
    component: SingleEstimateHistogram,
    arguments: {},
    state: "waiting",
    taskID: "type-three-sentences-b"
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
    state: "typing-action",
    taskID: "type-three-sentences-b"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "The 50/90",
      text: <span>A bayesian approach, asking two fuzzy qestions about how long you <em>believe</em> it will take.</span>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Try it!",
      text: <span>You are going to <strong>tell the person next to you your full name, and have them repeat it.</strong> How many seconds should we give you to believe you can finish the task half of the time? How many seconds should we give you to be 90% confident you can finish the task?</span>
    },
    state: "two-number-estimate",
    taskID: "full-name"
  },

  {
    component: NormalEstimateHistogram,
    arguments: {
      title: "Your Average 50/90",
      fakeout: 0
    },
    state: "waiting",
    taskID: "full-name"
  },

  {
    component: NormalEstimateOutcome,
    arguments: {
      title: "Results"
    },
    state: "simple-action",
    taskID: "full-name"
  },

  {
    component: NormalEstimateHistogram,
    arguments: {
      title: "The Normal Problem",
      fakeout: 50
    },
    state: "waiting",
    taskID: "full-name"
  },

  {
    component: TitleTextAndImage,
    arguments: {
      title: "The Log Normal!",
      text: "It's never less than zero. It has a long tail on the long side. It effectively models the length of chess games, and internet comments.",
      //      image: logNormal
    },
    state: "waiting",
    taskID: "full-name"
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Math is hard",
      text: <span>Use <em>mode</em> instead of <em>50</em> &mdash; {"the peak of the curve isn't in the middle."}</span>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Math is really hard",
      text: "The distribution of a sum of log normally distributed random variables has no exact closed-form solution."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Computer is easy",
      text: <span>We can <em>simulate</em> the sum instead.</span>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: JustText,
    arguments: {
      text: <ol>
        <li>Generate a single <em>possible</em> value based on the estimate; this is a <em>simulation</em></li>
        <li>Simulate each task, and sum. This is a <em>simlated run</em>.</li>
        <li>Generate 10,000 simulated runs. This is &asymp; the summed distribution.</li>
      </ol>
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TakeHome,
    arguments: {
      text: "Monte Carlo Simulation"
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "but",
      text: "Because we're simulating, we don't need to average anymore. Optimists and pessimists each get their due."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "Whatever let's try it",
      text: <span>{"You're gonna"} <strong>take off one shoe and then put it back on.</strong> How long, in seconds, do you think it will take?</span>
    },
    state: "two-number-estimate",
    taskID: "shoe"
  },

  {
    component: LogNormalEstimateHistogram,
    arguments: {
      title: "A Thing of Questionable Beauty"
    },
    state: "waiting",
    taskID: "shoe"
  },

  {
    component: LogNormalEstimateOutcome,
    arguments: {
      text: "Results"
    },
    state: "simple-action",
    taskID: "shoe"
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
      title: "What does this mean?",
      text: "Estimation is about comunication, not consensus."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean?",
      text: "Restimation can be done anytime, even by an individual."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean for whom?",
      text: "PM: Instead of telling me 'I have maybe 3 days left' at standup, my engineers update the estimate; I can see schedule changes in realtime."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean for whom?",
      text: "Engineer: I don't need to say 'it is taking longer than I thought' out loud. I can communicate but maintain my pride, and avoid 'is it done yet?' nagging."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean for whom?",
      text: "PO: The estimated schedule always shows the latest info. I can make decisions without pulling engineers aside to sychronously reestimate."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean for whom?",
      text: "Designer: I don't have to wait for a big synchronous meeting to get a sense of how complex my ideas are."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "What does this mean for whom?",
      text: "Financial stakeholder: I understand that there is uncertainty, but it is quantified. I can plan for both the best case and the worst."
    },
    state: "waiting",
    taskID: ""
  },

  {
    component: TitleAndText,
    arguments: {
      title: "but it's so haaaard",
      text: "It really isn't! The math is within reach of a developer-day or two. You can give lognormal estimation a try for minimal cost."
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
      title: "Thanks!",
      text: "I've been Sam Bleckley. Contact me at sam@climatum.com; I'd love to hear from you."
    },
    state: "contact",
    taskID: ""
  },
];

export default slides;
