'use strict';

/* jshint browser: true */
/*global angular */

// hand-transpiled from components/services/permission-service.ts

angular.module('taskbaseApp')
  .factory('Permission', ($resource) => { //deprecated
    return $resource('/api/permission');
  })
  .factory('ResourcePermission', ($resource) => { //deprecated
    return $resource('/api/permission');
  });

class PermissionService {

  constructor($http, $stateParams, TrackingService, $q, Current) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.TrackingService = TrackingService;
    this.$q = $q;
    this.Current = Current;
  }

  httpGetPermission (permission, resourceName, resourceId) {
    let that = this;

    let config = {
      params: {
        activity: permission,
        container: resourceId,
        resourceName: resourceName,
        resourceId: resourceId
      }
    };

    return that.$http.get('/api/permission', config);
  }

  get coursePermissions() {

    if (!this._coursePermissions) {

      if (this.Current.viewAsStudent) {
        this.setExplicitCoursePermissions({
          CREATE_COURSE :false,
          UPDATE_COURSE: false,
        });
      } else {
        this._coursePermissions = this.setCoursePermissions();
      }

    }

    return this._coursePermissions;
  }

  clearPermissions(clearStudentView) {
    if (clearStudentView) {
      this.Current.viewAsStudent = false;
    }
    delete this._coursePermissions;
  }

  setExplicitCoursePermissions(permissions) {
    let wrapperToMakeItSameTypeAsHttpResponse = {
      data: permissions
    };
    this._coursePermissions = this.$q.when(wrapperToMakeItSameTypeAsHttpResponse);
  }

  setCoursePermissions($stateParams) {

    let stateParams = $stateParams || this.$stateParams; //in state.resolve, the state params must be passed in

    let coursePermissions = ['UPDATE_COURSE', 'CREATE_COURSE'];

    let config = {
      params: {
        activity: coursePermissions,
        container: stateParams.containerId
      }
    };

    let promise = this.$http.get('/api/permission', config);

    promise.then(resp => {
      if (!resp.data.UPDATE_COURSE) {
        //doesn't make sense to view as student;
        this.Current.viewAsStudent = false;
      }
    });

    return promise;

  }

  unsetCoursePermissions() {
    this._coursePermissions = undefined;
  }

}
// NOTE: the era's .ts wrote `private $inject` (an instance field, not the
// static tsc/angular reads), so the compiled service was injected by
// parameter name. Named explicitly here because these files are not minified.
PermissionService.$inject = ['$http', '$stateParams', 'TrackingService', '$q', 'Current'];

angular.module('taskbaseApp').service('PermissionService', PermissionService);
