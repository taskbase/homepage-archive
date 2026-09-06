import {AppPage} from './app.po';

describe('taskbase-homepage App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.disableWait();
    page.navigateTo();
  });

  it('should display jumbo correctly', () => {
    expect(page.getJumboHeader()).toEqual('Interaktive Lernlösungen,\n' +
      'die mitdenken');
    expect(page.getJumboLargePic().isPresent()).toBeTruthy();
    expect(page.getJumboSmallPic().isPresent()).toBeFalsy();
  });

  it('should display offer', () => {
    expect(page.getJumboHeader()).toEqual('Interaktive Lernlösungen,\n' +
      'die mitdenken');
    expect(page.getOffer().isPresent()).toBeTruthy();
    expect(page.getOffer().getText()).toContain('Ihre Lernkonzepte');
    expect(page.getOffer().getText()).toContain('Unsere Technologien');
    expect(page.getOffer().getText()).toContain('Für Lernerfolge');
  });



});
