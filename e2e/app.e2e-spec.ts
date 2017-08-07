import { CrudAppPage } from './app.po';

describe('crud-app App', () => {
  let page: CrudAppPage;

  beforeEach(() => {
    page = new CrudAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
