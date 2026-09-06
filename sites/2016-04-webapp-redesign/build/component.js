// hand-transpiled from components/app/component.ts (no tsc on this box)
function Component(moduleOrName, selector, options) {
  return (controller) => {
    var module = typeof moduleOrName === "string"
        ? angular.module(moduleOrName)
        : moduleOrName;
    module.component(selector, angular.extend(options, { controller: controller }));
  }
}
