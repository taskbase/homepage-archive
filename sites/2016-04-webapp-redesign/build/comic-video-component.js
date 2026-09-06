// hand-transpiled from components/directives/comic-video/comic-video-component.ts
class ComicVideoComponent {

  constructor(Utils) {
    this.Utils = Utils;
  }

}
ComicVideoComponent.$inject = ['Utils'];

Component('taskbaseApp', 'comicVideo', {
  templateUrl: 'components/directives/comic-video/comic-video-component.html',
  bindings: {
    close: "&",
    resolve: "<"
  }
})(ComicVideoComponent);
