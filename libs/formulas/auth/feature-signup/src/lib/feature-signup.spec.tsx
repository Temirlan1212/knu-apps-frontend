import { render } from '@testing-library/react';

import FeatureSignup from './feature-signup';

describe('FeatureSignup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureSignup />);
    expect(baseElement).toBeTruthy();
  });
});
