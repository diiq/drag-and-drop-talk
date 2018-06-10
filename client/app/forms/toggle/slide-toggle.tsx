import * as React from 'react';
//import { pointerCoord } from './util'
import { ActionContextService, Action } from 'focus';
import { styles, vars, css, Style } from 'styles/css';
import { Focusable } from 'focus';

export interface SlideToggleProps {
  onChange: (value: string) => void
  leftLabel: string
  rightLabel: string
  leftValue: string
  rightValue: string
  disabled?: boolean
  value: string
  css?: Style
  light?: boolean
  'aria-labelledby'?: string
  'aria-label'?: string
};

ActionContextService.addContext("slide-toggle", {
  hidden: true,
  name: "Toggle",
  documentation: "Toggles between options.",
  actions: {
    change: new Action({
      name: "Toggle left",
      shortDocumentation: "Pick the leftmost option",
      searchTerms: [],
      actOn: (c: SlideToggle) => {
        c.setState({
          checked: false
        }, () => c.setValue());
      },
      defaultKeys: ["ArrowLeft"]
    }),
    read: new Action({
      name: "Toggle right",
      shortDocumentation: "Pick the rightmost option",
      searchTerms: [],
      actOn: (c: SlideToggle) => {
        c.setState({
          checked: true
        }, () => c.setValue());
      },
      defaultKeys: ["ArrowRight"]
    })
  }
});

export class SlideToggle extends React.Component<SlideToggleProps, {}> {
  previouslyChecked: boolean
  input: HTMLInputElement
  moved: boolean
  startX: number
  activated: boolean
  state: {
    checked: boolean
    hasFocus: boolean
  }

  constructor(props: SlideToggleProps) {
    super(props)
    this.state = {
      checked: this.checkedFromValue(props.value),
      hasFocus: false
    }
  }

  value() {
    if (this.state.checked) {
      return this.props.rightValue;
    } else {
      return this.props.leftValue;
    }
  }

  checkedFromValue(value: string) {
    return value === this.props.rightValue;
  }

  setValue() {
    this.props.onChange(this.value());
  }

  handleFocus() {
    this.setState({ hasFocus: true })
  }

  handleBlur() {
    this.setState({ hasFocus: false })
  }

  componentWillReceiveProps(newProps: SlideToggleProps) {
    this.setState({ checked: this.checkedFromValue(newProps.value) });
  }

  onChange = () => {
    this.setState({ checked: !this.state.checked }, () => this.setValue());
  }

  handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    this.startX = pointerCoord(event).x
    this.activated = true
  }

  handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (!this.activated) return
    this.moved = true

    if (this.startX) {
      let currentX = pointerCoord(event).x
      if (this.state.checked && currentX + 15 < this.startX) {
        this.setState({ checked: false })
        this.startX = currentX
        this.activated = true
      } else if (currentX - 15 > this.startX) {
        this.setState({ checked: true })
        this.startX = currentX
        this.activated = (currentX < this.startX + 5)
      }
    }
  }

  handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (!this.moved) return
    const checkbox = this.input
    event.preventDefault()

    if (this.startX) {
      let endX = pointerCoord(event).x
      if (this.previouslyChecked === true && this.startX + 4 > endX) {
        if (this.previouslyChecked !== this.state.checked) {
          this.setState({ checked: false })
          this.previouslyChecked = this.state.checked
          checkbox.click()
        }
      } else if (this.startX - 4 < endX) {
        if (this.previouslyChecked !== this.state.checked) {
          this.setState({ checked: true })
          this.previouslyChecked = this.state.checked
          checkbox.click()
        }
      }

      this.activated = false
      this.startX = null
      this.moved = false
    }
  }

  styles() {
    if (this.props.light) {
     return toggleStyles("#ddd", vars.color.themeLight, vars.color.whiteLight);
    } else {
      return toggleStyles();
    }
  }

  labelFor(on: boolean) {
    const style = this.styles();
    if ((on && this.state.checked) || (!on && !this.state.checked)) {
      return <div {...style.rightLabel}>
        {this.props.rightLabel}
      </div>;
    } else {
      return <div {...style.leftLabel}>
        {this.props.leftLabel}
      </div>;
    }
  }

  render() {
    const style = this.styles();
    return (
      <Focusable
        trigger={this.onChange}
        tabIndex={0}
        mouseOverFocus={false}
        role="slider"
        context="slide-toggle"
        contextComponent={this}
        ariaLabel={`Toggle ${this.props.leftLabel} or ${this.props.rightLabel}.`}
        ariaValuetext={this.value()}
        css={[style.toggle, this.props.css]}>

        <div onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}>
          <div {...css(style.track,
            this.state.checked && style.checkedTrack) }>
            {this.labelFor(false)}
          </div>
          <div {...css(style.thumb,
            this.state.checked && style.checkedThumb) } >
            <div {...style.rightLabel}>
              {this.labelFor(true)}
            </div>
          </div>
        </div>
      </Focusable>
    )
  }
}

const toggleStyles = (background = vars.color.theme, toggle = vars.color.themeLight, text = vars.color.whiteLight, height = 40, width = 195) => {
  return styles({
    toggle: {
      marginTop: 4,
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: 0,
      padding: 0,
      userSelect: "none",
      borderRadius: 10
    },
    focus: {
      ...vars.focus[':focus'],
      backgroundColor: vars.color.themeLight,
    },

    disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
      transition: "opacity 0.25s",
    },

    leftLabel: {
      display: 'inline-block',
      width: width / 2,
      textAlign: 'center'
    },

    rightLabel: {
      display: 'inline-block',
      width: width / 2,
      textAlign: 'center'
    },

    track: {
      width: width + 16,
      boxSizing: 'border-box',
      height: height,
      padding: `${(height - 2) / 2}px 5px`,
      ...vars.border,
      borderColor: 'transparent',
      backgroundColor: background,
      textAlign: "right",
      lineHeight: 0,
      color: toggle,
      transition: "all 0.2s ease",
      boxShadow: vars.shadow.insetBoxShadow,
    },

    checkedTrack: {
      textAlign: "left",
    },

    thumb: {
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      position: "absolute",
      top: 3,
      left: 3,
      lineHeight: 0,
      padding: `${(height - 6) / 2}px 0`,
      width: width / 2,
      borderRadius: vars.border.borderRadius - 2,
      textAlign: 'center',
      backgroundColor: toggle,
      color: text,
      boxShadow: vars.shadow.boxShadow,
    },

    checkedThumb: {
      left: 'calc(50% + 5px)',
    }
  });
};

function pointerCoord(event: any) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    if (event) {
      const changedTouches = event.changedTouches
      if (changedTouches.length > 0) {
        const touch = changedTouches[0]
        return { x: touch.clientX, y: touch.clientY }
      }
    }
    const pageX = event.pageX
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY }
    }
  }
  return { x: 0, y: 0 }
}
