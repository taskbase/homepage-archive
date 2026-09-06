'use strict';

/* jshint browser: true */
/*global angular */

/**
 * Define angular routes
 */
angular.module('taskbaseApp')
  .constant('ACTIVITY', {
    CREATE_COURSE: 'CREATE_COURSE',
    CREATE_COLLECTION: 'CREATE_COLLECTION',
    UPDATE_COURSE: 'UPDATE_COURSE',
    VIEW_UNPUBLISHED: 'VIEW_UNPUBLISHED'
  })
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    //To fix IE Caching
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get.Pragma = 'no-cache';

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise('/landing');

    /**
     * Helper function to generate views
     * @param  {String} url         Url to be matched against
     * @param  {String} templateUrl Path to the tempalte file of the view
     * @param  {String} controller  Optional
     */
    var createView = function (url, templateUrl, controller) {
      var headerView = {
          'templateUrl': 'components/header/header.html',
          'controller': 'HeaderController'
        },
        footerView = {
          'templateUrl': 'components/footer/footer.html',
          'controller': 'FooterController'
        },
        mainView = {};

      mainView.templateUrl = 'components/' + templateUrl;
      if (controller) {
        mainView.controller = controller;
      }

      return {
        'url': url,
        'views': {
          'headerView': headerView,
          'mainView': mainView,
          'footerView': footerView
        }
      };
    };

    // Set up states
    $stateProvider
      .state('home', createView(
        '/home',
        'home/home.html',
        'HomeController')
      )
      .state('landing', createView(
        '/landing',
        'landing/landing.html',
        'LandingController')
      )
      .state('test', createView(
        '/test?course?collection?courseStudent?collectionRead?role',
        'test/test.html',
        'TestController')
      )
      .state('profile', createView(
        '/profile',
        'profile/profile.html',
        'ProfileController')
      )
      .state('collection', createView(
        '/collection/:collectionId?recompile?store',
        'collection/collection.html',
        'CollectionController')
      )
      .state('recommender', createView(
        '/course/:courseId/objective/:objectiveId/recommender',
        'recommender/recommender.html',
        'RecommenderController')
      )
      .state('signup',createView(
        '/signup',
        'signup/signup.html',
        'SignupController')
      )
      .state('signup-teachers',createView(
        '/signup',
        'signup/signup.html',
        'SignupController')
      )
      .state('connect',createView(
        '/connect',
        'connect/connect.html',
        'ConnectController')
      )
      .state('store',createView(
        '/store',
        'store/store.html',
        'StoreController')
      )
      .state('objectives',createView(
        '/course/:courseId/objectives',
        'objectives/objectives.html',
        'ObjectivesController')
      )
      .state('task-search',createView(
        '/task-search?courseId?objectiveId?q?tasktype?nottasktype?addedTask',
        'task-search/task-search.html',
        'TaskSearchController')
      )
      .state('assignment-edit',createView(
        '/course/:courseId/assignment/:objectiveId/edit',
        'objective-tasks/objective-tasks.html',
        'ObjectiveTasksController')
      )
      .state('assignment',createView(
        '/course/:courseId/assignment/:objectiveId',
        'assignment/assignment.html',
        'AssignmentController')
      )
      .state('problem',createView(
        '/task/:taskId/problem/:problemIndex',
        'problem/problem.html',
        'ProblemController')
      )
      .state('task-submissions',createView(
        '/task/:taskId/submissions',
        'task-submissions/task-submissions.html',
        'TaskSubmissionsController')
      )
      .state('objective-tasks',createView(
        '/course/:courseId/objective/:objectiveId/tasks',
        'objective-tasks/objective-tasks.html',
        'ObjectiveTasksController')
      )
      .state('objective-theory',createView(
        '/course/:courseId/objectiveId/:objectiveId/theory',
        'objective-tasks/objective-tasks.html',
        'ObjectiveTasksController')
      )
      .state('pw-reset',createView(
        '/pw-reset',
        'pw-reset/pw-reset.html',
        'PwResetController')
      )
      .state('forgot-password',createView(
        '/forgot-password',
        'pw-reset/forgot-password.html',
        'ForgotPasswordController')
      )
      .state('course',createView(
        '/course/:courseId',
        'course/course.html',
        'CourseController'
        )
      ).state('course-settings',createView(
        '/course/:courseId/settings',
        'course-settings/course-settings.html',
        'CourseSettingsController'
        )
      ).state('course-people',createView(
        '/course/:courseId/people',
        'course-people/course-people.html',
        'CoursePeopleController'
        )
      ).state('course-collections',createView(
        '/course/:courseId/collections',
        'course-collections/course-collections.html',
        'CourseCollectionsController'
        )
      ).state('collection-permissions',createView(
        '/collection/:collectionId/permissions',
        'collection-permissions/collection-permissions.html',
        'CollectionPermissionsController'
        )
      ).state('collection-settings',createView(
        '/collection/:collectionId/settings',
        'collection-settings/collection-settings.html',
        'CollectionSettingsController'
        )
      ).state('group',createView(
        '/group/:groupId',
        'group/group.html',
        'GroupController'
        )
      ).state('verify',createView(
        '/verify?email?key?host',
        '/verify/verify.html',
        'VerifyController'
        )
      ).state('forum',createView(
        '/:resourceName/:resourceId/forum',
        '/forum/forum.html',
        'ForumController'
        )
      ).state('tutorial',createView(
        '/tutorial',
        '/tutorial/tutorial.html',
        'TutorialController'
        )
      ).state('collection-administration',createView(
        '/collection-administration',
        '/collection-administration/collection-administration.html',
        'CollectionAdministrationController'
        )
      ).state('course-forum',createView(
        '/course/:courseId/course-forum',
        '/course-forum/course-forum.html',
        'CourseForumController'
        )
      ).state('course-registration',createView(
        '/course-registration',
        '/course-registration/course-registration.html',
        'CourseRegistrationController'
        )
      ).state('assignment-settings',createView(
        '/course/:courseId/assignment/:objectiveId/settings',
        '/assignment-settings/assignment-settings.html',
        'AssignmentSettingsController'
        )
      ).state('competence-search',createView(
        '/competence-search?blockId?courseId',
        '/competence-search/competence-search.html',
        'CompetenceSearchController'
        )
      ).state('competence-import',createView(
        '/competence-import',
        '/competence-import/competence-import.html',
        'CompetenceImportController'
        )
      ).state('print-objective',createView(
        '/objective/:objectiveId/print?type',
        '/print-objective/print-objective.html',
        'PrintObjectiveController'
        )
      );

      $locationProvider.html5Mode(false);

  }]);

/**
 * Redirect the user to the sign up page when the user is not logged in
 */
angular.module('taskbaseApp')
  .run(['$rootScope', '$state', '$http', '$location',
    function($rootScope, $state, $http, $location) {
      $rootScope.$on("$locationChangeSuccess", function() {
        var loggedIn = $rootScope.loggedIn,
          whiteList = ['/forgot-password', '/pw-reset', '/test', '/signup', '/verify', '/connect', '/tutorial'],
          inWhiteList = false,
          url = $location.url();

        angular.forEach(whiteList, function(value) {
          if (url.indexOf(value) === 0) {
            inWhiteList = true;
          }
        });

        if (inWhiteList) {
          return;
        } else if (loggedIn === undefined) {
          $http.get('/api/login').then(function(response) {
            if (response.data.loggedIn) {
              $rootScope.loggedIn = true;
              if (url.indexOf('/landing') === 0) {
                $state.go('home');
              }
            } else {
              $rootScope.loggedIn = false;
              if (url.indexOf('/landing') !== 0) {
                $state.go('landing');
              }
            }
          });
        } else if (loggedIn === false) {
          if (url.indexOf('/landing') !== 0) {
            $state.go('landing');
          }
        } else if (loggedIn === true) {
          if (url.indexOf('/landing') === 0) {
            $state.go('home');
          }
        }
      }); // this is to ensure correct navigation
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.previousStates = $rootScope.previousStates || {};
        if ($rootScope.goingForward) {
          $rootScope.previousStates[to.name] = {
            name: from.name,
            stateParams: fromParams
          };
          $rootScope.goingForward = false;
        } else {
          $rootScope.goingForward = false;
        }
      });
    }]);
