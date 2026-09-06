'use strict';
import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;


/* jshint browser: true */
/*global angular */

angular.module('acadillyApp')
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
      private TrackingService: TrackingService,
      private $q: IQService,
      private Current: Current
  ) {

  }

  public httpGetPermission (permission: CoursePermissionsEnum, resourceName?:string, resourceId?:string): IHttpPromise<CoursePermissions> {
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


  private _coursePermissions: IHttpPromise<CoursePermissions>;

  public get coursePermissions(): IHttpPromise<CoursePermissions> {

    if (!this._coursePermissions) {

      if (this.Current.viewAsStudent) {
        this.setExplicitCoursePermissions({
          UPDATE_COURSE: false,
          CREATE_MESSAGE: true
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

  public setExplicitCoursePermissions(permissions: CoursePermissions) {
    let wrapperToMakeItSameTypeAsHttpResponse = {
      data: permissions
    };
    this._coursePermissions = <any>this.$q.when(wrapperToMakeItSameTypeAsHttpResponse); // TODO TB: Check why any is required
  }

  private _appPermissions: IHttpPromise<AppPermissions>;

  public setAppPermissions(): void {
    let permissions = ['TEACHER_VIEW', 'CREATE_COURSE', 'ADMINISTRATION'];
    const config = {
      params: {
        activity: permissions
      }
    };
    const req: IHttpPromise<AppPermissions> = this.$http.get('/api/permission', config);

    //sideeffect: tag
    req.then(resp => {
      if (resp.data.TEACHER_VIEW) {
        this.TrackingService.pushTag('TEACHER');
      }
    });

    this._appPermissions = req;
  }

  public get appPermissions(): IHttpPromise<AppPermissions> {
    return this._appPermissions;
  }

  public setCoursePermissions($stateParams?): IHttpPromise<CoursePermissions> {

    let stateParams = $stateParams || this.$stateParams; //in state.resolve, the state params must be passed in

    let coursePermissions: CoursePermissionsEnum[] = ['UPDATE_COURSE', 'CREATE_MESSAGE'];

    let config = {
      params: {
        activity: coursePermissions,
        container: stateParams.containerId
      }
    };

    let promise: IHttpPromise<CoursePermissions> = this.$http.get('/api/permission', config);

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

angular.module('acadillyApp').service('PermissionService', PermissionService);
