import React, { FunctionComponent } from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const SelectedPlayerPlaceholder: FunctionComponent = () => (
  <Card>
    <Placeholder>
      <Placeholder.Image square />
    </Placeholder>
    <Card.Content>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length='short' />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length='long' />
        </Placeholder.Paragraph>
      </Placeholder>
      <br />
      <Card.Description>
        Click on a player to view more details about them.
      </Card.Description>
    </Card.Content>
  </Card>
);

export default SelectedPlayerPlaceholder;