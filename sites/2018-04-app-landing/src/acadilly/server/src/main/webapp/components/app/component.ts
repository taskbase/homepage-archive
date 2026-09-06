function Component(options: {
  selector: string,
  controllerAs?: string | boolean,
  template?: string,
  templateUrl?: string,
  bindings?: any
}) {
  return (controller: Function) => {

    let selector = options.selector;
    delete options.selector;

    var module = angular.module('acadillyApp');
    module.component(selector, angular.extend(options, { controller: controller }));
  }
}
