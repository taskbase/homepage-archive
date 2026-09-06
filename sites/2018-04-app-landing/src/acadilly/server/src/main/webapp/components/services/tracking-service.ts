import ILocationService = angular.ILocationService;
class TrackingService {

  static $inject = ['$location'];

  constructor(
      public $location: ILocationService
  ){}

  private get isProduction(): boolean {
    return location.host.indexOf('www.taskbase.com') > -1;
  }

  public pushTag(tagsObject) {
    if (this.isProduction) {
      __insp && __insp.push(['tagSession', tagsObject]);
    }
  }

  public identify(userIdentifier: string) {
    if (this.isProduction) {
      __insp && __insp.push(['identify', userIdentifier]);
    }
  }

}

angular.module('acadillyApp').service('TrackingService', TrackingService);

