import * as React from 'react';
import { TitleAndText } from 'presentation/title-and-text/title-and-text';
import { TitleAndBigText } from 'presentation/title-and-big-text/title-and-big-text';
import { TakeHome } from 'presentation/take-home/take-home.component';


interface Slide {
  presentationComponent: React.ComponentClass<{}>
  presentationArguments: {},
  secondaryComponent: React.ComponentClass<{}>
  secondaryArguments: {}
}

const slides: Slide[] = [
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: <div>It’s kind of <br />a drag</div>,
      text: <div><p>Get out your phone, tablet, or laptop, and visit <strong>talks.sambleckley.com</strong> for live secondary content.</p>

      <p>Didn’t bring a device? Make friends with your neighbor, and look at theirs!</p></div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "You made it!",
      text: "Thanks for coming to this second, secret presentation."
    }
  },

  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "",
      text: <div>
        <p>Sam Bleckley<br />
        Software Engineer, Designer, and Consultant
        </p>

      <p><strong>sambleckley.com</strong><br />
      <strong>sam@sambleckley.com</strong><br />
      <strong>@diiq</strong> on Twitter</p></div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "What a dork, am I right?"
    }
  },

  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Problem Statement:",
      text: "Do drag and drop"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>{"(don't tell anyone"}<br />{"but there's a second picture"}<br />{"a bigger picture)"}</div>
    }
  },

  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Solution:",
      text: "There are, like, a dozen great libraries out there. Use one of those."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>&ldquo;Complications are sure to follow.&rdquo;<br /> &mdash; Abbot John Daido Loori</div>
    }
  },

  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Thank you.",
      text: "If there's any time left I'll take questions."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Ask him if he's a truck.</div>
    }
  },

  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Why Not Use Existing Libraries?",
      text: ""
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Because we are free humans! And geniuses, too, damnit!</div>
    }
  },
];

export default slides;
