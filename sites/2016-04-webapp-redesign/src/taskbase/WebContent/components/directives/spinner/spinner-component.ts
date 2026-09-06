@Component('taskbaseApp', 'spinner', {
  templateUrl: '/components/directives/spinner/spinner-component.html',
  bindings: {
    size: "<",
    center: "<"
  }
})
class Spinner {

  public size: number;
  public center: boolean;
  constructor() {}

  public style;
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
  public get borderWidth (): string {
    return Math.ceil(this.size/100*6) + 'px';
  }

  public get display() {
    return this.center ? 'block' : 'inline-block';
  }


}
