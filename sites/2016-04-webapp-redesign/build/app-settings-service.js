// hand-transpiled from components/services/app-settings-service.ts

class AppSettingsService {

  constructor(Utils){
    this.Utils = Utils;

    if (location.host.indexOf('e-maths') > -1) {
      this._appSettings = {
        id: 'e-maths',
        title: 'E-Maths',
        landingPageType: 'e-maths',
      }
    } else {
      //Taskbase is default
      this._appSettings = {
        id: 'taskbase',
        title: 'Taskbase',
        landingPageType: 'main',
        mainBg: 'bg-white',
        specialBg1: 'bg-symphony',
        hasSecondaryFooter: true,
        hasSecondaryHeader: true,

      }
    }

  }

  getSettings() {
    return this._appSettings
  }

}
AppSettingsService.$inject = ['Utils'];

angular.module('taskbaseApp').service('AppSettingsService', AppSettingsService);
