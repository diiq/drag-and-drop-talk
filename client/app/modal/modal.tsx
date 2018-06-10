import * as React from 'react';

// Components
import { Modal as BModal } from 'react-overlays';
import { ActionContextService, Action } from 'focus';
import { ActionButton } from 'action-button/action-button';
import { Unfocusable } from 'focus';

//CSS
import { styles, vars, Style, css } from 'styles/css';

// This is a cheap hack but the type for
// modal doesn't support restoreFocus.
// TODO open a PR against definitelytyped
// to fix this.
//const CModal = BModal as any;


export interface ModalProps {
  toHide(): void,
  dialogCss?: Style
  showX?: boolean
};

ActionContextService.addContext("modal", {
  hidden: true,
  actions: {
    hide: new Action({
      name: "Hide modal",
      shortDocumentation: "",
      searchTerms: ["hide"],
      actOn: (c: Modal) => {
        c.props.toHide()
      },
      defaultKeys: ["Escape"]
    })
  }
});

export class Modal extends React.Component<ModalProps, {}> {
  stopProp = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  render() {
    return <div
      onMouseOver={this.stopProp}
      onClick={this.stopProp}
      onMouseDown={this.stopProp}
      onDrag={this.stopProp}
      onFocus={this.stopProp}>
      <BModal
        show={true}
        keyboard={false}
        restoreFocus={false}
        enforceFocus={false}
        onHide={this.props.toHide}
        onBackdropClick={(e: Event) => { this.props.toHide(); e.stopPropagation(); }}
        backdrop
        backdropStyle={backdropStyle}>
        <Unfocusable context="modal"
          contextComponent={this}
          css={style.positioner}
          constrainFocus={true}>
          <div {...css([style.dialog, this.props.dialogCss]) }>
            {this.props.showX && <ActionButton action="hide" replacementCss={style.close}>
              &times;
            </ActionButton>}

            {this.props.children}
          </div>
        </Unfocusable>
      </BModal >
    </div>
  }
}


const backdropStyle = {
  position: 'fixed',
  top: 0, bottom: 0, left: 0, right: 0,
  backgroundColor: '#000',
  zIndex: 1000,
  opacity: 0.5,
};

const size = 30;
const style = styles({
  dialog: {
    width: '80%',
    maxWidth: 1280,
    margin: '0 auto',
    height: '80%',
    backgroundColor: 'white',
    position: 'relative',
    pointerEvents: 'all',
    borderRadius: vars.border.borderRadius,
    '@media(max-width:500px)': {
      width: '98%',
      height: '98%'
    }
  },
  positioner: {
    position: 'fixed',
    zIndex: 1001,
    top: 0, bottom: 0, left: 0, right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  close: {
    zIndex: 1002,
    position: 'absolute',
    top: -size / 2,
    right: -size / 2,
    width: size,
    height: size,
    borderRadius: size / 2,
    lineHeight: 0,
    padding: `${size / 2}px 0`,
    backgroundColor: vars.color.warn,
    color: "#fff",
    textAlign: "center",
    ':hover': {
      backgroundColor: vars.color.warnLight,
    },
  }
});
