import { RouteDeclaration } from 'router';

// Components
import { Presentation } from 'presentation/presentation';
import { SecondScreen } from 'second-screen/second-screen';
import { ImaLink } from 'ima-link';


export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'presentation', component: Presentation },
    { path: 'ima-link', component: ImaLink },
    { path: '', component: SecondScreen },
  ],
};
