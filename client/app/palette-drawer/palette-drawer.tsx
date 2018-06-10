import * as React from 'react';
import { styles, vars } from 'styles/css';
import { Button } from 'button/button';
import { DragActor } from 'drag-drop/drag-actor';
import { Color } from 'models';
import { DragPosition } from 'drag-drop/drag-context';
import { Palette } from 'models';
import { observer } from 'mobx-react';
import { ColorGroupView } from 'palette-drawer/color-group-view';
import { ShortInput } from 'forms/short-input/short-input';
import { ActionContextService, Action } from 'focus';
import { Unfocusable } from 'focus/unfocusable/unfocusable';
import * as download from 'downloadjs';
import { apiPath } from 'environments/current';
import { Link } from 'link/link';

const icon_url = require("./palette_icon.svg");

export interface PaletteDrawerProps {

};

ActionContextService.addContext("add-group", {
  hidden: true,
  actions: {
    submit: new Action({
      name: "submit",
      shortDocumentation: "",
      searchTerms: [],
      hidden: true,
      defaultKeys: ["Enter"],
      actOn: (c: PaletteDrawer) => c.makeGroup()
    }),
    cancel: new Action({
      name: "cancel",
      shortDocumentation: "",
      searchTerms: [],
      hidden: true,
      defaultKeys: ["Escape"],
      actOn: (c: PaletteDrawer) => c.setState({state: "default"})
    }),
  },
  opaque: true
});


@observer
export class PaletteDrawer extends React.Component<PaletteDrawerProps, {}> {
  state = {
    open: false,
    downloading: false,
    state: "default",
    name: ""
  }
  ref: HTMLDivElement

  toggle = () => {
    this.setState({open: !this.state.open});
  }

  open = () => {
    this.setState({open: true});
  }

  close = () => {
    this.setState({open: false});
  }

  drop = (monitor: {color: Color, fromPalette: boolean, index: number}, position: DragPosition) => {
    if (!monitor.fromPalette) {
      this.close();
    }
    Palette.current.save();
  }

  setRef = (r: HTMLDivElement) => {
    this.ref = r;
  }

  makeGroup = () => {
    Palette.current.addGroup(this.state.name);
    this.setState({state: "default", name: ""});
  }

  downloadForSketch = () => {
    download(JSON.stringify(Palette.current.sketch()), "palette.sketchpalette", "text/json")
  }

  urlForProcreate = () => {
     return apiPath + "palette/procreate?swatches=" + JSON.stringify(Palette.current.procreate());
  }

  render() {
    return <DragActor contextName="swatches" id="pallete-drawer" dragStart={this.open} dragStop={this.drop}>
      {this.state.open && <Button replacementCss={style.overlay} action={this.close} />}

      <div {...style.drawer} {...(this.state.open && style.open)} ref={this.setRef}>
        <Button action={this.toggle} replacementCss={[style.openButton, this.state.open && style.openOpenButton]}><img src={icon_url} /></Button>

        <div {...style.groups}>
          {Palette.current.groups.map((g, i) => <ColorGroupView group={g} key={i} remove={() => Palette.current.removeGroup(g)}/>)}
        </div>

        {this.state.state == "default" && <div {...style.buttons} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button action={() => this.setState({state: "adding"})} theme="action" flex>Add Group</Button>
          <Button action={() => this.setState({state: "downloading"})} theme="success" flex>Download</Button>
          <Button action={() => Palette.current.reset()} theme="warn" flex>Clear</Button>
        </div>}

        {this.state.state == "adding" && <div {...style.buttons}>
          <Unfocusable context="add-group" contextComponent={this}>
            <ShortInput label="Group Name" autofocus onChange={n => this.setState({name: n})} value={this.state.name} />
            <div {...style.choices}>
              <Button action={this.makeGroup} theme="success">Save</Button>
              <Button action={() => this.setState({state: "default"})} theme="warn">Cancel</Button>
            </div>
          </Unfocusable>
        </div>}

        {this.state.state == "downloading" && <div {...style.buttons}>
          <Button action={this.downloadForSketch} theme="action">For Sketch</Button>
          <Link to={this.urlForProcreate()} theme="success">For Procreate</Link>
          <Button action={() => this.setState({state: "text"})}>As Text</Button>
          <Button action={() => this.setState({state: "default"})} theme="warn">Cancel</Button>
        </div>}

        {this.state.state == "text" && <div {...style.buttons}>
          <textarea {...style.textarea}>{Palette.current.text()}</textarea>
          <Button action={() => this.setState({state: "default"})}>Done</Button>
        </div>}
      </div>
    </DragActor>;
  }
}

let style = styles({
  textarea: {
    height: 150
  },
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  groups: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowY: "auto",
    width: 325
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderLeft: "1px solid #999",
    color: vars.color.theme,
    transition: "width 1000ms",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '@media(min-width: 1000px)': {
      position: 'static',
      width: 325,
      transition: "width 250ms",
      height: '100vh',
    }
  },
  buttons: {
    padding: 7,
    width: 325,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexShrink: 0
  },
  choices: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  open: {
    width: 325,
    transition: "width 250ms",
    boxShadow: "-2px 2px 2px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.1)",
  },
  openButton: {
    position: 'absolute',
    left: -45,
    top: 35,
    width: 40,
    height: 40,
    cursor: 'pointer',
    opacity: .7,
    ':hover': {
      opacity: 1
    },
    ':focus': {
      boxShadow: 'none'
    },
    transition: 'transform 1000ms'
  },
  openOpenButton: {
    transition: 'transform 250ms',
    transform: 'rotate(90deg)'
  }
});
