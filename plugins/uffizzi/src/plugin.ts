import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const uffizziPlugin = createPlugin({
  id: 'uffizzi',
  routes: {
    root: rootRouteRef,
  },
});

export const UffizziPage = uffizziPlugin.provide(
  createRoutableExtension({
    name: 'UffizziPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
