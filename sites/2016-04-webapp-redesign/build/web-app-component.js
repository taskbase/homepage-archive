// hand-transpiled from components/directives/web-app/web-app-component.ts
// MUSEUM DEVIATION: $onInit's two external side-effects are dropped -- the
// MathJax poll (an endless 100 ms setTimeout loop when no MathJax CDN is
// reachable) and the //www.google.com/jsapi Google Charts loader. Neither
// touches the landing page and the contract forbids remote/tracking refs.
class WebApp {

  constructor(Utils, UserService, $state, PermissionService, $rootScope,
              $timeout, Current, GoogleAnalyticsService, AppSettingsService) {
    this.Utils = Utils;
    this.UserService = UserService;
    this.$state = $state;
    this.PermissionService = PermissionService;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.Current = Current;
    this.GoogleAnalyticsService = GoogleAnalyticsService;
    this.AppSettingsService = AppSettingsService;
  }

  $onInit() {
  }

  bg() {
    if (this.$state.current.name === 'landing' ||
        this.$state.current.name === 'about' ||
        this.$state.current.name === 'details' ||
        this.$state.current.name === 'signup' ||
        this.$state.current.name === 'pricing'
    ) {
      return this.AppSettingsService.getSettings().specialBg1;
    } else {
      return this.AppSettingsService.getSettings().mainBg;
    }
  }

  loggedIn() {
    return this.UserService.loggedIn();
  }

}
WebApp.$inject = ['Utils', 'UserService', '$state', 'PermissionService', '$rootScope',
  '$timeout', 'Current', 'GoogleAnalyticsService', 'AppSettingsService'];

Component('taskbaseApp', 'webApp', {
  templateUrl: 'components/directives/web-app/web-app-component.html',
  bindings: {
  }
})(WebApp);
