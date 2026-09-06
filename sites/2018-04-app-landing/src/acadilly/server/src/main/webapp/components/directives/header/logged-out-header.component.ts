@Component({
  selector:'loggedOutHeader',
  templateUrl: '/components/directives/header/logged-out-header.component.html',
  bindings: {
  }
})
class LoggedOutHeaderComponent {

  static $inject: string[] = ['$scope', 'AppSettingsService'];
  constructor(
    private $scope,
    private AppSettingsService: AppSettingsService
  ) {

  }

  $onInit() {
    window.addEventListener('resize', this.closeEvent);
    window.addEventListener('click', this.closeEvent);
    this.settings = this.AppSettingsService.getSettings().header.loggedOut;
  }

  $onDestroy() {
    window.removeEventListener('resize', this.closeEvent);
    window.removeEventListener('click', this.closeEvent);
  }

  settings: LoggedOutHeaderSettings;

  closeEvent = (() => {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.$scope.$apply();
    }
  }).bind(this);

  public appId;
  public isMenuOpen = false;

  iOsFixerFlag = false; // ng-click somehow fires twice on iOS...
  public toggleMenu($event) {
    $event.stopPropagation();
    if (!this.iOsFixerFlag) {
      this.isMenuOpen = !this.isMenuOpen;
      this.iOsFixerFlag = true;
    }
    setTimeout(() => {
      this.iOsFixerFlag = false;
    }, 100);
  }

  public closeMenu($event) {
    $event.stopPropagation();
    this.isMenuOpen = false;
  }
}
