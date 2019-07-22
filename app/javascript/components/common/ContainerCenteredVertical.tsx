import React, { FunctionComponent, Props } from 'react';
import { Container, Segment } from "semantic-ui-react";

const ContainerCenteredVertical: FunctionComponent<Props<JSX.Element>> = (props) => (
  <Container as={Segment} style={{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }}>
    {props.children}
  </Container>
);

export default ContainerCenteredVertical;