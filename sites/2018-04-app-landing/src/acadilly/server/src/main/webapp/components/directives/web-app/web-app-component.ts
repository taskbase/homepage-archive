@Component({
  selector: 'webApp',
  templateUrl: '/components/directives/web-app/web-app-component.html',
  bindings: {}
})
class WebApp {

  static $inject: string[] = ['Utils', 'UserService', '$state', 'PermissionService', '$rootScope',
    '$timeout', 'Current', 'GoogleAnalyticsService', 'AppSettingsService'];

  constructor(private Utils: Utils,
              private UserService: UserService,
              private $state,
              private PermissionService: PermissionService,
              private $rootScope: IRootScopeService,
              private $timeout,
              private Current: Current,
              private GoogleAnalyticsService: GoogleAnalyticsService,
              private AppSettingsService: AppSettingsService) {
  }

  $onInit() {

    let initMathjaxFunction = () => {
      if (!(<any>window).MathJax) {
        setTimeout(function () {
          initMathjaxFunction();
        }, 100);
      } else {
        this.$rootScope.$watch(function () {
          MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
          return true;
        });
      }
    };
    initMathjaxFunction();

    $.ajax({
      url: '//www.google.com/jsapi',
      dataType: 'script',
      cache: true,
      success: () => {
        this.Current.googleChartReady = true;
        this.$rootScope.$broadcast(BroadcastEvents[BroadcastEvents.GOOGLE_CHART_READY]);
      }
    });

    this.PermissionService.setAppPermissions();

  }

  public bg(): string {
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

  public loggedIn(): boolean {
    return this.UserService.loggedIn();
  }


}

