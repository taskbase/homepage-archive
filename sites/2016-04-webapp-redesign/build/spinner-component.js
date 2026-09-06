// hand-transpiled from components/directives/spinner/spinner-component.ts
class Spinner {

  constructor() {}

  $onInit() {
    this.style = {
      height: this.size + 'px',
      width: this.size + 'px',
      display: this.display
    }
    if (this.size <= 10) {
      this.style = angular.extend(this.style, {
        'border-width': '1px 0px 0px 0px',
        '-webkit-border-radius': '90%',
        '-moz-border-radius': '90%',
        'border-radius': '90%'
      })
    }
  }

  //not in use
  get borderWidth () {
    return Math.ceil(this.size/100*6) + 'px';
  }

  get display() {
    return this.center ? 'block' : 'inline-block';
  }

}

Component('taskbaseApp', 'spinner', {
  templateUrl: 'components/directives/spinner/spinner-component.html',
  bindings: {
    size: "<",
    center: "<"
  }
})(Spinner);
