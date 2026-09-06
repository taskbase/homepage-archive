// hand-transpiled from components/directives/counter2/counter2-component.ts
class CounterTwoComponent {

  constructor(Utils) {
    this.Utils = Utils;
  }

}
CounterTwoComponent.$inject = ['Utils'];

Component('taskbaseApp', 'counter2', {
  templateUrl: 'components/directives/counter2/counter2-component.html',
  bindings: {
    n: "<",
    title: "<"
  }
})(CounterTwoComponent);
