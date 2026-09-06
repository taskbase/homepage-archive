'use strict';
import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;


/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp')
  .factory('Permission', ($resource) => { //deprecated
    return $resource('/api/permission');
  })
  .factory('ResourcePermission', ($resource) => { //deprecated
    return $resource('/api/permission');
  });

class PermissionService {

  private $inject: ['$http', '$stateParams', 'TrackingService', '$q', 'Current'];

  constructor(
      private $http: IHttpService,
      private $stateParams,
      private TrackingService,
      private $q: IQService,
      private Current: Current
  ) {

  }

  public httpGetPermission (permission: PermissionsEnum, resourceName?:string, resourceId?:string): IHttpPromise<Permissions> {
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
  };


  private _coursePermissions: IHttpPromise<Permissions>;

  public get coursePermissions(): IHttpPromise<Permissions> {

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

    //console.log(arguments.callee.caller, 'CALLER');
    return this._coursePermissions;
  }

  public clearPermissions(clearStudentView?: boolean) {
    if (clearStudentView) {
      this.Current.viewAsStudent = false;
    }
    delete this._coursePermissions;
  }

  public setExplicitCoursePermissions(permissions: Permissions) {
    let wrapperToMakeItSameTypeAsHttpResponse = {
      data: permissions
    };
    this._coursePermissions = this.$q.when(wrapperToMakeItSameTypeAsHttpResponse);
  }

  public setCoursePermissions($stateParams?): IHttpPromise<Permissions> {

    let stateParams = $stateParams || this.$stateParams; //in state.resolve, the state params must be passed in

    let coursePermissions:CoursePermissionsEnum[] = ['UPDATE_COURSE', 'CREATE_COURSE'];

    let config = {
      params: {
        activity: coursePermissions,
        container: stateParams.containerId
      }
    };

    let promise: IHttpPromise<Permissions> = this.$http.get('/api/permission', config);

    promise.then(resp => {
      if (!resp.data.UPDATE_COURSE) {
        //doesn't make sense to view as student;
        this.Current.viewAsStudent = false;
      }
    });

    return promise;

  }

  public unsetCoursePermissions(): void {
    this._coursePermissions = undefined;
  }


};

angular.module('taskbaseApp').service('PermissionService', PermissionService);
