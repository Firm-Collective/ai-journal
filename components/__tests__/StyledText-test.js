import * as React from 'react';
import renderer from 'react-test-renderer';

import {TextRegular} from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<TextRegular>Snapshot test!</TextRegular>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
