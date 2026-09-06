class TrackingService {

  static $inject = [];

  constructor(
  ){}

  public pushTags(tagsObject) {
    __insp && __insp.push(['tagSession', tagsObject]);
  }

  public identify(userIdentifier: string) {
    __insp && __insp.push(['identify', userIdentifier]);
  }

}

angular.module('taskbaseApp').service('TrackingService', TrackingService);

