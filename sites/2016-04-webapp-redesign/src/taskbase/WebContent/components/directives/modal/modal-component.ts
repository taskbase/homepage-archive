@Component('taskbaseApp', 'modal', {
  templateUrl: '/components/directives/modal/modal-component.html',
  bindings: {
    resolve: "<",
    close: "&"
  }
})
class ModalComponent {

  public resolve;
  public close;

  static $inject: string[] = ['Utils', '$compile', '$scope', '$log'];

  constructor(
    private Utils: Utils,
    private $compile,
    private $scope,
    private $log: ILogService
  ) {}

  public style;

  $onInit() {

    this.initModal();
    this.initCloseButton();

    this.$scope.$on(EmitEvents.MODAL_CLOSE, () => {
      this.close();
    });

  }

  private initModal() {
    if (this.resolve && this.resolve.component) {
      let bindingsString = (bindings): string => {
        let str = "";
        if (bindings) {
          for (var property in bindings) {
            if (bindings.hasOwnProperty(property)) {
              str += " " + this.Utils.camelCaseToDash(property) + "=\"$ctrl." + property + "\"";
              this[property] = bindings[property];
            }
          }
        }
        return str;
      };

      let completeString = `<${this.resolve.component}` + bindingsString(this.resolve.bindings) +`><${this.resolve.component}>`;
      let compiledHtml = this.$compile(completeString)(this.$scope);
      $('#tb-modal').html(compiledHtml);
    } else {
      this.$log.error("Modal not correctly initialized");
    }
  };

  private initCloseButton() {

    this.style = {
      position: 'absolute',
      top: '-20px',
      right: '8px',
      'font-size': 35 + 'px',
      'z-index': 1000,
      color: this.Utils.primaryColor
    };

  }

  public open

}

