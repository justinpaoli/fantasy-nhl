import React, { FunctionComponent } from 'react'
import { QueueProps } from '../types';
import { Step } from 'semantic-ui-react';

const Queue: FunctionComponent<QueueProps> = ({ state }) => {
  const [title, ...queue] = state.split('|');

  return (
    <Step.Group>
      <Step content={title.toUpperCase()} />
      {queue.map((user, i) => <Step content={user} active={i === 0} />)}
    </Step.Group>
  );
};

export default Queue;