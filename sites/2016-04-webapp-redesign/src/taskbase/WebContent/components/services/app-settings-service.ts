class AppSettingsService {

  static $inject = ['Utils'];

  constructor(
    private Utils
  ){

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

  private _appSettings: AppSettings;

  public getSettings() {
    return this._appSettings
  }

}
angular.module('taskbaseApp').service('AppSettingsService', AppSettingsService);

interface AppSettings {
  id: string; //taskbase, e-maths, ...
  title: string; //Taskbase, E-Maths, ...
  landingPageType: string; //main, e-maths, ...
  mainBg?: string;
  specialBg1?: string;
  hasSecondaryFooter?: boolean;
  hasSecondaryHeader?: boolean;
}
