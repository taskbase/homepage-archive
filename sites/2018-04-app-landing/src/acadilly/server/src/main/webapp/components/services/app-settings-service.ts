enum AppIds {
  MATHBRIDGE = "MATHBRIDGE",
  ACADILLY = "ACADILLY",
  EMATHS = "e-maths",
  TASKBASE = 'taskbase'
}

// TAG:ACADILLY_CUSTOMIZATION
class AppSettingsService {

  static $inject = [];

  constructor(

  ){

    if (location.host.indexOf('e-maths') > -1) {
      const logoWhite = '/assets/img/logos/e-maths2.png';
      this._appSettings = {
        id: AppIds.EMATHS,
        title: 'E-Maths',
        createTemplateCourse: false,
        showTutor: false,
        onlyAllowRegistrationForStudents: true,
        logos: {
          white: logoWhite,
        },
        header: {
          loggedOut: {
            isWhite: false,
            logo: logoWhite,
            logoHeight: 40,
            links: [{
              link: 'signup',
              text: 'Sign Up'
            }, {
              link: 'login',
              text: 'Login'
            }]
          }
        },
        colors: {
          primary: '#66594B'
        }
      }
    } else if (location.host.indexOf('mathbridge') > -1) {
      const logoWhite = '/assets/img/logos/mathbridge-white.svg';
      this._appSettings = {
        id: AppIds.MATHBRIDGE,
        title: 'Mathbridge',
        createTemplateCourse: false,
        showTutor: false,
        onlyAllowRegistrationForStudents: true,
        logos: {
          white: logoWhite
        },
        header: {
          loggedOut: {
            isWhite: false,
            logo: logoWhite,
            logoHeight: 60,
            links: [{
              link: 'pricing',
              text: 'Pricing'
            }, {
              link: 'signup',
              text: 'Sign Up'
            }, {
              link: 'login',
              text: 'Login'
            }]
          }
        },
        colors: {
          primary: '#76AFAD'
        }
      }
    } else if (location.host.indexOf('acadilly') > -1) {
      const logoWhite = '/assets/img/logos/acadilly-white.svg';
      const logoColor = '/assets/img/logos/acadilly.svg';
      this._appSettings = {
        id: AppIds.ACADILLY,
        title: 'Taskbase',
        mainBg: 'bg-white',
        specialBg1: 'bg-symphony',
        hasSecondaryFooter: true,
        hasSecondaryHeader: true,
        createTemplateCourse: true,
        showTutor: true,
        logos: {
          white: logoWhite,
          color: logoColor
        },
        header: {
          loggedOut: {
            isWhite: true,
            logo: logoColor,
            logoHeight: 45,
            links: [{
              link: 'pricing',
              text: 'Preise'
            },{
              link: 'signup',
              text: 'Registrieren'
            }, {
              link: 'login',
              text: 'Login'
            }]
          }
        },
        colors: {
          primary: '#134196'
        }
      }
    } else {
      const logoWhite = '/assets/img/logos/taskbase.svg';
      const logoColor = '/assets/img/logos/taskbase-alt.svg';
      this._appSettings = {
        id: AppIds.TASKBASE,
        title: 'Taskbase',
        mainBg: 'bg-white',
        specialBg1: 'bg-symphony',
        hasSecondaryFooter: true,
        hasSecondaryHeader: true,
        createTemplateCourse: true,
        showTutor: true,
        logos: {
          white: logoWhite,
          color: logoColor
        },
        header: {
          loggedOut: {
            isWhite: true,
            logo: logoColor,
            logoHeight: 45,
            links: [{
              link: 'signup',
              text: 'Registrieren'
            }, {
              link: 'login',
              text: 'Login'
            }]
          }
        },
        colors: {
          primary: '#009688'
        }
      }
    }

  }

  private _appSettings: AppSettings;

  public getSettings() {
    return this._appSettings
  }

}
angular.module('acadillyApp').service('AppSettingsService', AppSettingsService);

interface AppSettings {
  id: AppIds; //acadilly, e-maths, ...
  title: string; //acadilly, E-Maths, ...
  mainBg?: string;
  specialBg1?: string;
  hasSecondaryFooter?: boolean;
  hasSecondaryHeader?: boolean;
  createTemplateCourse: boolean;
  showTutor: boolean;
  askTeacherStudent?: boolean;
  showRegistrationHelper?: boolean;
  onlyAllowRegistrationForStudents?: boolean;
  logos: {
    white: string;
    color?: string;
  };
  header: {
    loggedOut: LoggedOutHeaderSettings;
  };
  colors: ColorScheme;
}

interface LoggedOutHeaderSettings {
  isWhite: boolean;
  logo: string;
  logoHeight: number;
  links: {
    link: string;
    text: string;
  }[]
}

interface ColorScheme {
  primary: string;
}
