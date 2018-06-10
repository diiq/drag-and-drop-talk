import * as React from 'react';

import { MunsellPage } from './munsell-page/munsell-page'
import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';

export interface MunsellPageViewProps {
  hue: string
};

export class MunsellPageView extends React.PureComponent<MunsellPageViewProps, {}> {
  render() {
    const hue = Number(this.props.hue)
    return <MainContentWrapper>
        <MunsellPage hue={hue} key={hue} />
    </MainContentWrapper>;
  }
}
