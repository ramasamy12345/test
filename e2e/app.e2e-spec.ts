import { HumanAppPage } from './app.po';

describe('human-app App', () => {
  let page: HumanAppPage;

  beforeEach(() => {
    page = new HumanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
