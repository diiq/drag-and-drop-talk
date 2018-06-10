import * as React from 'react';
import { HueSelector } from 'hue-selector/hue-selector';
import { go } from 'router';

// Components
import { DragContext } from 'drag-drop/drag-context';
import { PaletteDrawer } from 'palette-drawer/palette-drawer';
// CSS
import { styles, vars } from 'styles/css';
import { Color } from 'models/color/color';


export interface MainContentWrapperProps {
};

export class MainContentWrapper extends React.PureComponent<MainContentWrapperProps, {}> {
  state = {
    hex: ""
  }

  findHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    this.setState({hex: val});
    try {
      const c = new Color(val);
      go(`/colors/${c.lightness}/${c.chroma}/${c.hue}`);
    } catch (e) {

    }
  }

  render() {
    return (
      <DragContext contextName="swatches">
        <div {...style.content}>
          <div {...style.main}>
            <nav {...style.nav}>
              <HueSelector action={(hue => go(`/colors/*/*/${hue}`))}/>
              <input value={this.state.hex} onChange={this.findHex} placeholder="#" />
            </nav>
            <main>{this.props.children}</main>
          </div>
          <PaletteDrawer />
        </div>
      </DragContext>
    );
  }
}

const style = styles({
  content: {
    display: 'flex'
  },
  nav: {
    display: "flex"
  },
  main: {
    flex: 1,
    overflowY: "auto",
    height: "100vh",
    ...vars.scrollbars
  }
})