import * as TokenauthActions from './tokenauth.actions';

describe('Tokenauth', () => {
  it('should create an instance', () => {
    expect(new TokenauthActions.LoadTokenauths()).toBeTruthy();
  });
});
