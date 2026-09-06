'use strict';

/* jshint ignore:end */

/**
 * Define angular routes
 */

// hand-transpiled from components/app/routes.ts.
// The whole era state table is kept verbatim so `ui-sref` in the era templates
// still resolves. Only the landing/root pair has its controller ported, so
// glue/museum.js blocks transitions to the other states.

angular.module('taskbaseApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $provide) {

      // for sentry
      $provide.decorator("$exceptionHandler", function ($delegate) {
        return function (exception, cause) {
          $delegate(exception, cause);
          //Raven.captureException(exception);
        };
      });

      // some magic to make $state in resolve available (http://stackoverflow.com/a/27255909/3022127)
      $provide.decorator('$state', function ($delegate, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, state, params) {
          $delegate.next = state;
          $delegate.toParams = params;
        });
        return $delegate;
      });

      //To fix IE Caching
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }

      //disable IE ajax request caching
      $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      // extra
      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get.Pragma = 'no-cache';


      /**
       * Helper function to generate views
       * @param  {String} url         Url to be matched against
       * @param  {String} templateUrl Path to the tempalte file of the view
       * @param  {String} controller  Optional
       */
      var createView = function (url, templateUrl, controller, mainViewOnly) {
        var headerView = {
              'templateUrl': 'components/header/header.html',
              'controller': 'HeaderController'
            },
            footerView = {
              'templateUrl': 'components/footer/footer.html',
              'controller': 'FooterController'
            },
            mainView = {
              templateUrl: 'components/views/' + templateUrl,
              controller: {}
            };

        if (controller) {
          mainView.controller = controller;
        }

        var handleBadStates = (UserService, $state, $timeout) => {
          var badStatesWhenLoggedOut = ['home', 'profile', 'recommender', 'course-settings', 'root'];
          var badStatesWhenLoggedIn = ['about', 'landing', 'signup', 'forgot-password', 'root'];
          var currentBadStates = UserService.loggedIn() ? badStatesWhenLoggedIn : badStatesWhenLoggedOut;
          var isBadState = currentBadStates.indexOf($state.next.name) > -1;
          if (isBadState) {
            if (UserService.loggedIn()) {
              $timeout(() => {
                $state.go('home')
              }, 0);
            } else if (!UserService.loggedIn()) {
              $timeout(() => {
                $state.go('landing')
              }, 0);
            }
          }
        };

        let views = {};
        if (mainViewOnly) {
          views = {
            'mainView': mainView,
          }
        } else {
          views = {
            'headerView': headerView,
            'mainView': mainView,
            'footerView': footerView
          };
        }

        return {
          'url': url,
          'views': views,
          resolve: {
            getUser: (UserService, $state, $timeout) => {
              return UserService.getAndSetUser().then(() => {
                // no need to do anything here
              });
            },
            setLogin: (UserService, $state, $timeout) => {
              return UserService.getAndSetLoggedIn().then(() => {
                handleBadStates(UserService, $state, $timeout);
              })
            }
          }
        };
      };

      // Set up states
      $stateProvider
          .state('root', createView(
              '/',
              'root/root-view.html',
              'RootController')
          )
          .state('pricing',createView(
              '/pricing',
              'pricing/pricing-view.html',
              'PricingController'
              )
          )
          .state('print',createView(
              '/print/:taskId?containerId?solution?layout',
              'print/print-view.html',
              'PrintController',
              true
              )
          )
          .state('details',createView(
              '/product',
              'details/details-view.html',
              'DetailsController'
              )
          )
          .state('speed',createView(
              '/speed',
              'speed/speed-view.html',
              'SpeedController'
              )
          )
          .state('home', createView(
              '/home',
              'home/home.html',
              'HomeController')
          )
          .state('landing', createView(
              '/landing?invitation?q',
              'landing/landing.html',
              'LandingController')
          )
          .state('teaser-video', createView(
              '/teaser-video',
              'teaser-video/teaser-video.html',
              'TeaserVideoController'
              )
          )
          .state('task', createView(
              '/task/:taskId?containerId?play?latex?admin?index',
              'task/task.html',
              'TaskController')
          )
          .state('test', createView(
              '/test?course?collection?courseStudent?collectionRead?role',
              'test/test.html',
              'TestController')
          )
          .state('http', createView(
              '/http',
              'http/http-view.html',
              'HttpController'
              )
          )
          .state('profile', createView(
              '/profile?userId',
              'profile/profile.html',
              'ProfileController')
          )
          .state('collection', createView(
              '/collection/:collectionId?recompile?store',
              'collection/collection.html',
              'CollectionController')
          )
          .state('signup', createView(
              '/signup?email',
              'signup/signup.html',
              'SignupController')
          )
          .state('investor',createView(
              '/investor',
              'investor/investor-view.html',
              'InvestorController'
              )
          )
          .state('connect', createView(
              '/connect',
              'connect/connect.html',
              'ConnectController')
          )
          .state('store', createView(
              '/store',
              'store/store.html',
              'StoreController')
          )
          .state('task-search', createView(
              '/task-search?containerId?target?q?tasktype?nottasktype?addedTask?unshift',
              'task-search/task-search.html',
              'TaskSearchController')
          )
          .state('search', createView(
              '/search?q',
              'search/search.html',
              'searchController'
              )
          )
          .state('course', createView(
              '/course/:containerId?admin?email?authkey',
              'course/course-view.html',
              'CourseController'
              )
          )
          .state('problem', createView(
              '/task/:taskId/problem/:problemIndex',
              'problem/problem.html',
              'ProblemController')
          )
          .state('task-submissions', createView(
              '/task/:taskId/submissions',
              'task-submissions/task-submissions.html',
              'TaskSubmissionsController')
          )
          .state('pw-reset', createView(
              '/pw-reset',
              'pw-reset/pw-reset.html',
              'PwResetController')
          )
          .state('forgot-password', createView(
              '/forgot-password?email',
              'pw-reset/forgot-password.html',
              'ForgotPasswordController')
          )
          .state('course-settings', createView(
              '/course/:containerId/settings?extraRole',
              'course-settings/course-settings.html',
              'CourseSettingsController'
              )
          ).state('course-people', createView(
          '/course/:containerId/people?admin',
          'course-people/course-people-view.html',
          'CoursePeopleController'
          )
      ).state('group', createView(
          '/group/:groupId',
          'group/group.html',
          'GroupController'
          )
      ).state('verify', createView(
          '/verify?email?key?host',
          'verify/verify.html',
          'VerifyController'
          )
      ).state('forum', createView(
          '/forum/:taskId?containerId',
          'forum/forum.html',
          'ForumController'
          )
      ).state('tutorial', createView(
          '/tutorial',
          'tutorial/tutorial.html',
          'TutorialController'
          )
      ).state('collection-administration', createView(
          '/collection-administration',
          'collection-administration/collection-administration.html',
          'CollectionAdministrationController'
          )
      ).state('course-forum', createView(
          '/course/:containerId/course-forum?email?authkey',
          'course-forum/course-forum.html',
          'CourseForumController'
          )
      ).state('course-registration', createView(
          '/course-registration',
          'course-registration/course-registration.html',
          'CourseRegistrationController'
          )
      ).state('competence-search', createView(
          '/competence-search?target?containerId?q',
          'competence-search/competence-search.html',
          'CompetenceSearchController'
          )
      ).state('competence-import', createView(
          '/competence-import',
          'competence-import/competence-import.html',
          'CompetenceImportController'
          )
      ).state('print-objective', createView(
          '/objective/:objectiveId/print?type',
          'print-objective/print-objective.html',
          'PrintObjectiveController'
          )
      ).state('course-info', createView(
          '/course/:containerId/info',
          'course-info/course-info.html',
          'CourseInfoController')
      ).state('course-stats', createView(
          '/course/:containerId/course-stats?tab',
          'course-stats/course-stats.html',
          'CourseStatsController'
          )
      ).state('stats', createView(
          '/stats?taskId?containerId?tab',
          'stats/stats-view.html',
          'StatsController'
          )
      ).state('test-bug', createView(
          '/test-bug',
          'test-bug/test-bug.html',
          'TestBugController'
          )
      ).state('communication', createView(
          '/teacher-information',
          'communication/communication.html',
          'CommunicationController'
          )
      ).state('admin', createView(
          '/admin',
          'admin/admin.html',
          'AdminController'
          )
      ).state('autoobjective', createView(
          '/course/:containerId/autoobjective',
          'autoobjective/autoobjective.html',
          'AutoobjectiveController'
          )
      ).state('about', createView(
          '/about',
          'about/about.html',
          'AboutController'
          )
      ).state('qr', createView(
          '/qr',
          'qr/qr.html',
          'QrController'
          )
      ).state('impressum', createView(
          '/impressum',
          'impressum/impressum-view.html',
          'ImpressumController'
          )
      ).state('block', createView(
          '/block/:blockId',
          'block/block.html',
          'BlockController'
          )
      ).state('taskk', createView(
          '/taskk?showheader',
          'taskk/taskk-view.html',
          'TaskkController'
          )
      ).state('notes', createView(
          '/notes',
          'notes/notes-view.html',
          'NotesController'
          )
      ).state('table-sample', createView(
          '/table-sample',
          'table-sample/table-sample-view.html',
          'TableSampleController'
          )
      ).state('lottery',createView(
          '/lottery',
          'lottery/lottery-view.html',
          'LotteryController'
          )
      ).state('fhnw',createView(
          '/fhnw',
          'fhnw/fhnw-view.html',
          'FhnwController'
          )
      ).state('quiz-stats',createView(
          '/quiz-stats/:taskId?containerId',
          'quiz-stats/quiz-stats-view.html',
          'QuizStatsController'
          )
      ).state('join',createView(
          '/join/:secret',
          'join/join-view.html',
          'JoinController'
          )
      );

      // MUSEUM DEVIATION: era value was html5Mode(true). This exhibit is served
      // from a static sub-path with no server-side route table, so pushState URLs
      // would 404 on reload; routing falls back to the hashbang.
      $locationProvider.html5Mode(false);

    });
