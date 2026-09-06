'use strict';

/*global angular */

// hand-transpiled from components/directives/signup/signup.ts

angular.module('taskbaseApp')
  .directive('signup',
    ($http, Notify, $location, User, Login, $stateParams, Utils, TaskService) => {
    return {
      restrict: 'AE',

      scope: {
        userType: '<?',
        suppressRedirect: '<?'
      },
      templateUrl: 'components/directives/signup/signup.html',
      link: function (scope) {

        scope.user = {};
        scope.user.email = $stateParams.email;
        scope.user.userType = scope.userType;

        // Submit sign-up information
        scope.signUp = () => {

          scope.signingUp = true;

          if (!scope.user.userType){
            Notify.error("Select Teacher / Student");
            scope.signingUp = false;
          } else {
            let isTeacher = scope.user.userType === 'teacher';

            if (scope.user.fullName) {
              let nameParts = scope.user.fullName.split(" ");
              scope.user.firstName = nameParts[0];
              scope.user.lastName = nameParts[nameParts.length - 1];
            }

            User.save({host: $location.host(), isTeacher: isTeacher}, scope.user, () => {
              scope.signingUp = false;
              scope.signupFormSubmitted = true;

              //copy first course
              if (isTeacher) {
                TaskService.copyTemplateCourse().then(resp => {
                  Login.logIn({email: scope.user.email, password: scope.user.password}, scope.suppressRedirect);
                });
              } else {
                Login.logIn({email: scope.user.email, password: scope.user.password}, scope.suppressRedirect);
              }

            }, (response) => {
              scope.signingUp = false;
              //scope.user = tempUser;
              Notify.errorResponse(response);
            });
          }

        };
      }
    };
  });
