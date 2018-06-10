import { RouteDeclaration } from 'router';

// Components
import { Presentation } from 'presentation/presentation';

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'presentation', component: Presentation },
  ],
};
