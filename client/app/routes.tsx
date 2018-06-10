import { go, RouteDeclaration } from 'router';

// Components
import { MunsellPageView } from 'munsell-page-view/munsell-page-view';
import { ColorView } from 'color-view/color-view';

function redirect(loc: string) {
  return () => {
    go(loc);
    return true;
  };
}

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'colors', children: [
      { path: '*/*/:hue', component: MunsellPageView },
      { path: ':lightness/:chroma/:hue', component: ColorView },
      { path: '', preFilter: redirect('/colors/*/*/10')}
    ]},
    { path: '', preFilter: redirect('/colors/*/*/10')}
  ],
};
