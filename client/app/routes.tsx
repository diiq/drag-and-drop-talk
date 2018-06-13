import { RouteDeclaration } from 'router';

// Components
import { Presentation } from 'presentation/presentation';
import { SecondScreen } from 'second-screen/second-screen';


export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'presentation', component: Presentation },
    { path: '', component: SecondScreen },
  ],
};
