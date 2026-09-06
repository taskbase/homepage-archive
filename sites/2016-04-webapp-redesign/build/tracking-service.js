// hand-transpiled from components/services/tracking-service.ts
// __insp is the Inspectlet queue. The era's app.html declared it as a bare
// array; the museum build declares the array but never loads Inspectlet, so
// these pushes go nowhere (see glue/museum.js).

class TrackingService {

  constructor(){}

  pushTags(tagsObject) {
    __insp && __insp.push(['tagSession', tagsObject]);
  }

  identify(userIdentifier) {
    __insp && __insp.push(['identify', userIdentifier]);
  }

}
TrackingService.$inject = [];

angular.module('taskbaseApp').service('TrackingService', TrackingService);
