@Component('taskbaseApp', 'comicVideo', {
  templateUrl: '/components/directives/comic-video/comic-video-component.html',
  bindings: {
    close: "&",
    resolve: "<"
  }
})
class ComicVideoComponent {

  static $inject: string[] = ['Utils'];

  public resolve;
  public close;

  constructor(
    private Utils: Utils
  ) {}



}

