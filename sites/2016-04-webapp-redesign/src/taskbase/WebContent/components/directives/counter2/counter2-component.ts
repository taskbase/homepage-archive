@Component('taskbaseApp', 'counter2', {
  templateUrl: '/components/directives/counter2/counter2-component.html',
  bindings: {
    n: "<",
    title: "<"
  }
})
class CounterTwoComponent {

  public title: string;
  public n: number;
  static $inject: string[] = ['Utils'];

  constructor(
      private Utils: Utils
  ) {}

}

