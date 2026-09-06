'use strict';

/* jshint browser: true */
/* global angular */

/**
 * @ngdoc function
 * @name taskbaseApp.controller:HeaderController
 * @description # HeaderController Controller of the header
 */

angular.module('taskbaseApp')
  .controller('HeaderController',
    function($scope, $rootScope, $http, $state, Notify, Navigation, Login, $q, UserService: UserService
        , Utils: Utils, Permission, Upload, $timeout, Current: Current,
             PermissionService: PermissionService, AppSettingsService: AppSettingsService
    ) {

      //CONSTRUCTOR THINGS

      PermissionService.coursePermissions.then(resp => {
        $scope.showViewAsStudentButton = resp.data.UPDATE_COURSE && !Current.viewAsStudent;
      });

      //END CONSTRUCTOR THINGS


    $scope.urlContains = Utils.urlContains;

      $scope.eMathsOrLanding = $state.current.name === 'landing' ? 'http://e-maths.ch' : '/#/home';


      $scope.onLanding = $state.current.name === 'landing';

      $scope.loggedIn = () => {
        return UserService.loggedIn();
      };

      Permission.get({'activity': ['CREATE_COURSE']}, (response) =>{
        $scope.canCreateCourse = response.CREATE_COURSE;
      });

      $scope.secondaryHeader = () => {
        return (UserService.loggedIn() === false) && AppSettingsService.getSettings().hasSecondaryHeader;
      };

      $scope.addAlt = () => {
        return $scope.secondaryHeader() ? "-alt" : "";
      };

      $scope.loginData = {};

      $scope.goingForward = Navigation.goingForward;

      $scope.loginClicked;

      $scope.isEmaths = () => {
        return Utils.urlContains('e-maths');
      };

      $scope.goingLogin = function () {
        $scope.loginClicked = true;
      };

      $scope.closeLogin = function () {
        $scope.loginClicked = false;
      };

      $scope.appId = AppSettingsService.getSettings().id;

      $scope.user = UserService.getUser();

      $scope.logIn = Login.logIn;

      $scope.logOut = () => {
        Login.logOut();
      };

      $scope.openSupportModal = () => {
        Utils.openModal('support-form', 'SupportForm', $scope, undefined, undefined);
      };

      $scope.showCommunication = () => {
        return $scope.canCreateCourse && $state.current.name !== 'communication' && !Utils.urlContains('e-maths');
      };

      $scope.switchToStudentView = () => {
        Current.viewAsStudent = true;
        $state.reload();
      };

      $scope.switchToTeacherView = () => {
        Current.viewAsStudent = false;
        $state.reload();
      };

      $scope.showViewAsTeacherButton = () => {
        return Current.viewAsStudent;
      };

      $scope.openInputDialog = function () {
        $('#qr-code-input').click();
      };

    });
