import { browser, by, element } from 'protractor';

export class AppPage {

  // Bugfix for: https://github.com/angular/protractor/issues/4584
  // because we have recursive setTimeout in testimonial.component
  disableWait() {
    browser.waitForAngularEnabled(false);
  }

  navigateTo() {
    return browser.get('/');
  }

  getJumboHeader() {
    return element(by.id('jumbo-title')).getText();
  }

  getJumboLargePic() {
    return element(by.id('jumbo-large-pic'));
  }

  getJumboSmallPic() {
    return element(by.id('jumbo-small-pic'));
  }

  getOffer() {
    return element(by.id('offer'));
  }

}
