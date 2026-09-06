// hand-transpiled from components/directives/modal/modal-component.ts
class ModalComponent {

  constructor(Utils, $compile, $scope, $log) {
    this.Utils = Utils;
    this.$compile = $compile;
    this.$scope = $scope;
    this.$log = $log;
  }

  $onInit() {

    this.initModal();
    this.initCloseButton();

    this.$scope.$on(EmitEvents.MODAL_CLOSE, () => {
      this.close();
    });

  }

  initModal() {
    if (this.resolve && this.resolve.component) {
      let bindingsString = (bindings) => {
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
  }

  initCloseButton() {

    this.style = {
      position: 'absolute',
      top: '-20px',
      right: '8px',
      'font-size': 35 + 'px',
      'z-index': 1000,
      color: this.Utils.primaryColor
    };

  }

}
ModalComponent.$inject = ['Utils', '$compile', '$scope', '$log'];

Component('taskbaseApp', 'modal', {
  templateUrl: 'components/directives/modal/modal-component.html',
  bindings: {
    resolve: "<",
    close: "&"
  }
})(ModalComponent);
