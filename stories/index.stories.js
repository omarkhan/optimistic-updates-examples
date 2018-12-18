import React from 'react';

import { storiesOf } from '@storybook/react';

import { Toggle, TogglePessimistic, ToggleOptimistic } from './toggle';
import { createFakeApiHandler, createFakeFailHandler } from './api';

const apiHandler = createFakeApiHandler(1000);
const failHander = createFakeFailHandler(1000);

storiesOf('Toggle', module)
  .add('simple example', () => <Toggle apiUpdate={apiHandler} />)
  .add('simple example (request fails)', () => <Toggle apiUpdate={failHander} />)
  .add('pessimistic example', () => <TogglePessimistic apiUpdate={apiHandler} />)
  .add('pessimistic example (request fails)', () => <TogglePessimistic apiUpdate={failHander} />)
  .add('optimistic example', () => <ToggleOptimistic apiUpdate={apiHandler} />)
  .add('optimistic example (request fails)', () => <ToggleOptimistic apiUpdate={failHander} />);
