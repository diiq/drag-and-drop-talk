import * as React from 'react';
import { TitleAndText } from 'presentation/title-and-text/title-and-text';
import { TitleAndBigText } from 'presentation/title-and-big-text/title-and-big-text';
import { ActivationDemo } from 'demos/activation/activation-demo';
import { DropDemo } from 'demos/dropping/dropping-demo';
import { JustText } from 'presentation/just-text/just-text.component';
import { ImageAndText } from 'presentation/image-and-text/image-and-text';
import { TV } from 'presentation/tv/tv';
import { Connecting } from 'presentation/connecting/connecting';
import { AccessibilityDemo } from 'demos/accessibility/accessibility-demo';
import { Preconnect } from 'presentation/connecting/preconnect';
const canIUse: string = require('./caniuse.png');

interface Slide {
  presentationComponent: React.ComponentClass<{}>
  presentationArguments: {},
  secondaryComponent: React.ComponentClass<{}>
  secondaryArguments: {}
  unhacked?: boolean
}

const slides: Slide[] = [
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: <div>It’s kind of <br />a drag</div>,
      text: <div><p>Get out your phone, tablet, or laptop, and visit <strong>talks.sambleckley.com</strong> for live secondary content.</p>
      <p>Calvin Guest is the free WiFi SSID.</p>
      <p>Didn’t bring a device? Make friends with your neighbor, and look at theirs!</p></div>
    },
    secondaryComponent: Preconnect,
    secondaryArguments: {
      text: "Waiting for talk to start..."
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: <div>It’s kind of <br />a drag</div>,
      text: <div><p>Get out your phone, tablet, or laptop, and visit <strong>talks.sambleckley.com</strong> for live secondary content.</p>
      <p>Calvin Guest is the free WiFi SSID.</p>
      <p>Didn’t bring a device? Make friends with your neighbor, and look at theirs!</p></div>
    },
    secondaryComponent: Connecting,
    secondaryArguments: {
      text: "Connecting...",
      hackedText: "Don't tell Sam! I've hijacked his talk."
    },
    unhacked: true
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
      text: <div>He's Sam.<br />I'm Sam's subconscious.<br />He's a real dork, am I right?</div>
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
      text: <div>{"don't tell anyone"}<br />{"but there's a second picture"}<br />{"a bigger picture"}</div>
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
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p><strong>Observation:</strong> Most items you want to drag and drop, you’d also like to know more details about; details that don’t fit in a sensible drag target</p>

        <p><strong>Requirement:</strong> Details could appear in a modal, or an accordion, or some other disclosure</p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Sam's conscious mind is occupied with technical details.</div>
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p><strong>Observation:</strong> To compare, share, bookmark, and pin details, users want to be able to open them in new tabs</p>

        <p><strong>Requirement:</strong> One way or another, the disclosure interaction must fall through to a link</p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Because of that technical preoccupation, Sam's not going to tell you the <strong>real</strong> subject of this talk.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "I. The things I want to Drag and Drop are (maybe secretly) links."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>This talk is actually about how design and engineering cannot be separated, <em>especially</em> when you're dealing with physical interactions.</div>
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p><strong>Observation:</strong> Many items you want to drag and drop, you’d also like to edit, or edit some property of.</p>

        <p><strong>Requirement:</strong> Items may need to contain an input. </p>

        <p><strong>Observation:</strong> People select, copy, alter, and otherwise use their mouse or finger to interact with text inputs.</p>

        <p><strong>Requirement:</strong> DnD shouldn’t interfere with input interactions, nor vice-versa. </p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Drag and drop is just one example, but these same issues arise any time a complex interaction succeeds or fails depending on how it &ldquo;feels.&rdquo;</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "II. The things I want to Drag and Drop may include text inputs."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      text: <div>You may not be able invest this kind of lavish attention on <em>every</em> interaction; but you should know which ones are truly central to what you want to provide to the world</div>,
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p><strong>Observation:</strong> Even if it’s <em>sensible</em> to only have 10 or 20 items, some users will create hundreds.</p>

        <p><strong>Requirement:</strong> The interaction must remain performant for many hundreds of draggable objects moving around</p>

        <p><strong>Observation:</strong> Drag and drop is a physical metaphor, relying on long-trained muscle memory.</p>

        <p><strong>Requirement:</strong> Performant means ~60fps; if the illusion breaks, the interaction is instantly less intuitive.</p>
      </div>    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Anyway, as he rambles along, pay more attention to the <em>approach</em> than to the details. He talks too much, but his methods are sound.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "III. The things I want to Drag and Drop will be limitless as the stars and uncountable as grains of sand."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>One aspect of the work is <em>observing</em> people, and their larger context, and then expressing their needs (specific to this interaction) in technical terms.</div>
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p><strong>Observation:</strong> People use phones. They use tablets. They use computers that have both mice and touch-screens.</p>

        <p><strong>Requirement:</strong> Drag and drop should work for both mouse and touch, even when both are present in the same device.</p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Alternating what you <strong>see</strong> with what that means you should <strong>do</strong> is a poweful tool in general, not just in software.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "IV. All pointing devices are welcome."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: ""
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p>I. The items I want to Drag and Drop are links.</p>

        <p>II. Items may include text inputs.</p>

        <p>III. There may be lots of items moving; maintain 60fps.</p>

        <p>IV. All devices are welcome.</p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>What a bore.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Drag activation"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: "He's telling a lie, here;"
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Just use HTML5 Drag events",
      text: "...right?"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: "By which I mean, he's lying by pretending like the observation happened first, and only then did this technical work begin."
    }
  },
  {
    presentationComponent: ImageAndText,
    presentationArguments: {
      image: canIUse,
      text: "ugh."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Design <em>and then</em> develop is simply not how this work got done.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Still, we've got options."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: "And as soon as Sam realized there were options - even before the observation of users - he started building prototypes."
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Instant activation"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>A prototype is an <em>experiment, designed to answer a question</em> such as 'what activation strategy is most suitable?'</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Instant activation"
    },
    secondaryComponent: TV,
    secondaryArguments: {}
  },
  {
    presentationComponent: ActivationDemo,
    presentationArguments: {
      title: "Instant activation",
      mouseStrategy: "instant",
      touchStrategy: "instant"
    },
    secondaryComponent: ActivationDemo,
    secondaryArguments: {
      title: "Instant activation",
      mouseStrategy: "instant",
      touchStrategy: "instant"
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Time-based activation"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Because it is an experiment, a prototype should be modular; switching back and forth between testable variations should be <em>fast</em> and <em>easy</em>.</div>
    }
  },
  {
    presentationComponent: ActivationDemo,
    presentationArguments: {
      title: "Time-based activation",
      mouseStrategy: "waitForTime",
      touchStrategy: "waitForTime"
    },
    secondaryComponent: ActivationDemo,
    secondaryArguments: {
      title: "Time-based activation",
      mouseStrategy: "waitForTime",
      touchStrategy: "waitForTime"
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Mixed-strategy activation"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Your prototype <em>might</em> be useful in building the final interaction, but don't assume so; rewriting is a dirty word, but not a dirty practice.</div>
    }
  },
  {
    presentationComponent: ActivationDemo,
    presentationArguments: {
      title: "Mixed-strategy activation",
      mouseStrategy: "instant",
      touchStrategy: "waitForTime"
    },
    secondaryComponent: ActivationDemo,
    secondaryArguments: {
      title: "Mixed strategy activation",
      mouseStrategy: "instant",
      touchStrategy: "waitForTime"
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "More complications",
      text: <ul><li>avoiding long-press</li>
      <li>scroll events are passive</li>
      <li>jeez</li>
      </ul>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div><em>Building prototypes</em> and <em>observing users</em> are just the lub and dub one heartbeat; they don't happen strictly once, or in strict order, but over and over again.</div>
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Dropping",
      text: <ul><li>where is the dragee?</li>
      <li>what do we do when <del>the beat</del> the dragee drops?</li>
      </ul>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: "The answer to most subtle ux questions is: try it! And the faster you can try variations, the more refined your eventual choice will be."
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Where is it?",
      text: ""
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: "This is NOT the Agile Process™; these prototype-test iterations might last 30 minutes."
    }
  },
  {
    presentationComponent: DropDemo,
    presentationArguments: {
      title: "Positioning: top left corner",
      locationStrategy: "topLeft"
    },
    secondaryComponent: DropDemo,
    secondaryArguments: {
      title: "Positioning: top left corner",
      locationStrategy: "topLeft"
    },
    unhacked: true
  },
  {
    presentationComponent: DropDemo,
    presentationArguments: {
      title: "Positioning: centroid",
      locationStrategy: "centroid"
    },
    secondaryComponent: DropDemo,
    secondaryArguments: {
      title: "Positioning: centroid",
      locationStrategy: "centroid"
    },
    unhacked: true
  },
  {
    presentationComponent: DropDemo,
    presentationArguments: {
      title: "Positioning: mouse",
      locationStrategy: "mouse"
    },
    secondaryComponent: DropDemo,
    secondaryArguments: {
      title: "Positioning: mouse",
      locationStrategy: "mouse"
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Motion:",
      text: "Your framework isn't fast enough."
    },
    secondaryComponent: TV,
    secondaryArguments: {}
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Motion:",
      text: "Your framework isn't fast enough."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>With all these demos, the bastard won't let me get a word in edgewise. Typical.</div>
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Motion",
      text: "Use Plain Old Javascript™ and GPU-accelerated CSS."
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>One moral: to have complete control of a framework, you need to know about one or two layers of abstraction below it. Don't just know your framework, know the language and the compiler/interpreter that language runs on.</div>
    }
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Accessibility",
      text: ""
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Again, the linear order of Sam's talk is leading him to lie. Don't think about accessibility last.</div>
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Accessibility",
      text: "Cut-and-paste as a metaphor"
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>You can't leave it 'till the end. If it is a technical afterthought, it will seem so difficult that it will never get done.</div>
    }
  },
  {
    presentationComponent: AccessibilityDemo,
    presentationArguments: {
      title: "Accessibility",
    },
    secondaryComponent: AccessibilityDemo,
    secondaryArguments: {
      title: "Accessibility",
    },
    unhacked: true
  },
  {
    presentationComponent: TitleAndText,
    presentationArguments: {
      title: "Take-Homes",
      text: ""
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>Prepare to roll your eyes as Sam Misses The Point</div>
    }
  },
  {
    presentationComponent: JustText,
    presentationArguments: {
      text: <div>
        <p>1. Use a library if you can.</p>

        <p>2. A single strategy will never fully serve both mouse and finger.</p>

        <p>3. If it needs to be smooth, make use of the GPU.</p>

        <p>4. Accessible interactions are good for everyone.</p>
      </div>
    },
    secondaryComponent: TitleAndText,
    secondaryArguments: {
      title: "",
      text: <div>The REAL take-homes are:
        <p>1. Pick your battles; what interactions are central to the project?</p>

        <p>2. Don't design <em>and then</em> develop, particularly while prototyping.</p>

        <p>3. Know your tech and also the tech underlying it.</p>

        <p>4. Plan accessibility in from the get-go.</p>
      </div>
    }
  },
  {
    presentationComponent: TitleAndBigText,
    presentationArguments: {
      title: "Thank You",
      text: <div>Feel free to ask questions, say hi, or ask me if I'm a truck out in the hall.
        <p>Sam Bleckley<br />
        Software Engineer, Designer, and Consultant
        </p>

        <p><strong>sambleckley.com</strong><br />
        <strong>sam@sambleckley.com</strong><br />
        <strong>@diiq</strong> on Twitter</p>
        <p>The slides, demos, and code used in this presentation are available at https://github.com/diiq/drag-and-drop-talk</p>
      </div>
    },
    secondaryComponent: Preconnect,
    secondaryArguments: {
      text: "Talk has ended."
    },
    unhacked: true
  },
];

export default slides;
