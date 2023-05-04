import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { uffizziPlugin, UffizziPage } from '../src/plugin';

createDevApp()
  .registerPlugin(uffizziPlugin)
  .addPage({
    element: <UffizziPage />,
    title: 'Root Page',
    path: '/uffizzi'
  })
  .render();
