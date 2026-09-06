/**
 * Museum glue for the 2018-04 app landing exhibit — the only non-era JS here.
 *
 * The era code is untouched: templates, controllers and services are the ones
 * from tb.git@6afc676a32, compiled by build/transpile.py. Everything that used
 * to come from outside the webapp (the Java backend, Google Analytics,
 * Inspectlet, Olark, MathJax, the Google Charts loader) is either answered from
 * a fixture or turned off here, from the outside, by decorating the injectables.
 *
 * Nothing in this file rewrites an era template or an era .ts file on disk.
 */
(function () {
  'use strict';

  /* The mirrored webapp root, relative to index.html. The era app was served
   * from the domain root, so its code asks for '/assets/...' and
   * '/components/...'; the exhibit is served from a sub-path. */
  var WEBAPP = 'src/acadilly/server/src/main/webapp/';
  var ROOTED = /^\/(assets|components)\//;
  var ROOTED_IN_TEXT = /(["'(=])\/(assets|components)\//g;

  function reroot(url) {
    return ROOTED.test(url) ? WEBAPP + url.slice(1) : url;
  }

  function rerootText(text) {
    return text.replace(ROOTED_IN_TEXT, '$1' + WEBAPP + '$2/');
  }

  /* ---------------------------------------------------------------------- *
   * Globals the stripped third-party scripts used to provide.
   * ---------------------------------------------------------------------- */

  // app.html declared this inline next to the Inspectlet tag. The tracker is
  // stripped (museum contract), TrackingService still pushes onto the array —
  // it only does so on www.taskbase.com, so this never grows here.
  window.__insp = window.__insp || [];

  // GoogleAnalyticsService injected the analytics.js snippet and defined ga().
  // The service is a tracker, so it is replaced below; routes.ts still calls
  // ga('send', 'pageview') on every state change.
  window.ga = window.ga || function () {};

  // assets/js/ajax-mathjax.js pulled MathJax 2.7.1 off cdnjs. No formula on
  // this page needs it, and web-app-component polls for window.MathJax every
  // 100ms until it appears, so give it something to find.
  window.MathJax = window.MathJax || {
    Hub: { Queue: function () {}, Config: function () {} }
  };

  // web-app-component's $onInit loads //www.google.com/jsapi for Google Charts.
  // The exhibit renders offline; answer that one URL with nothing.
  if (window.jQuery) {
    var realAjax = window.jQuery.ajax;
    window.jQuery.ajax = function (options) {
      if (options && typeof options.url === 'string' &&
          options.url.indexOf('www.google.com/jsapi') > -1) {
        return;
      }
      return realAjax.apply(this, arguments);
    };
  }

  /* ---------------------------------------------------------------------- *
   * Backend fixtures.
   *
   * Only the endpoints the landing page actually reaches. Every shape is taken
   * from the era's own source — the frontend interface and the servlet that
   * answered it — and cited. No copy is invented: nothing here is displayed.
   * ---------------------------------------------------------------------- */

  var FIXTURES = {
    // LoginServlet.doGet -> LoginCheckResponse(false) for an anonymous visitor.
    // This is what makes web-app render <logged-out-header> instead of the
    // ui-view header, i.e. what makes this the page a visitor saw.
    'GET /api/login': { loggedIn: false },

    // UserServlet.doGet with no params on a guest request creates a temp user
    // and returns user.removeCredentials(); UserDAO.createTempUser sets
    // temp=true and email=_id. The landing page reads nothing off it, but the
    // 'landing' state's getUser resolve has to succeed or no view renders.
    'GET /api/user': {
      _id: '5ad61e0c28c30b0082894000',
      email: '5ad61e0c28c30b0082894000',
      temp: true,
      verified: false
    },

    // PermissionServlet.doGet returns a map of Activity -> hasAccess. An
    // anonymous user on the public group holds none of the three that
    // PermissionService.setAppPermissions asks for.
    'GET /api/permission': {
      TEACHER_VIEW: false,
      CREATE_COURSE: false,
      ADMINISTRATION: false
    },

    // ActionServlet.doGet -> actionHandler.begin(user), a fresh Action.
    // routes.ts's run block turns it into a PAGE_VIEW and posts it back.
    'GET /api/action': { startTime: 0, user: '5ad61e0c28c30b0082894000' },
    'POST /api/action': {}
  };

  function fixtureFor(method, url) {
    var path = url.split('?')[0].split('#')[0];
    var key = method.toUpperCase() + ' ' + path;
    return Object.prototype.hasOwnProperty.call(FIXTURES, key) ? FIXTURES[key] : null;
  }

  /* ---------------------------------------------------------------------- *
   * Wire it into the era module.
   * ---------------------------------------------------------------------- */

  angular.module('acadillyApp')

    .config(['$provide', function ($provide) {

      /* One decorator does the whole backend: api/... comes from FIXTURES,
       * everything else — above all every templateUrl — is delegated to the
       * real $httpBackend with its root-relative path re-rooted at the
       * mirrored webapp. Template bodies get the same treatment on the way
       * back, so the ng-src / ng-include / href inside them resolve without
       * anyone editing an era template. */
      $provide.decorator('$httpBackend', ['$delegate', '$injector',
        function ($delegate, $injector) {

          return function (method, url, post, callback) {
            var fixture = fixtureFor(method, url);

            if (fixture !== null) {
              // $timeout so the response lands outside the current digest and
              // brings its own one, the way the real backend's does.
              $injector.get('$timeout')(function () {
                callback(200, angular.toJson(fixture), '', 'OK');
              });
              return;
            }

            var args = Array.prototype.slice.call(arguments);
            args[1] = reroot(url);

            if (/\.html$/.test(args[1])) {
              args[3] = function (status, response, headersString, statusText) {
                if (typeof response === 'string') {
                  response = rerootText(response);
                }
                callback(status, response, headersString, statusText);
              };
            }

            return $delegate.apply(this, args);
          };
        }]);

      /* AppSettingsService picks the brand off location.host. localhost matches
       * none of e-maths / mathbridge / acadilly, so it already returns the
       * taskbase branch — the same one www.taskbase.com got, which is the point
       * of this exhibit. The other brands' settings and markup stay untouched.
       * Only the logo paths are re-rooted; they are the one asset reference
       * that comes out of JS rather than out of a template. */
      $provide.decorator('AppSettingsService', ['$delegate', function ($delegate) {
        var settings = $delegate.getSettings();
        var logos = settings.logos || {};
        Object.keys(logos).forEach(function (key) {
          logos[key] = reroot(logos[key]);
        });
        if (settings.header && settings.header.loggedOut) {
          settings.header.loggedOut.logo = reroot(settings.header.loggedOut.logo);
        }
        return $delegate;
      }]);

      /* GoogleAnalyticsService's constructor is nothing but the analytics.js
       * snippet plus a ga('create'/'send'). Stripped per the museum contract;
       * web-app-component injects it, so something has to be registered. */
      $provide.service('GoogleAnalyticsService', function () {});

      /* TaskService is injected by routes.ts's run block, which calls
       * getContainer only for a state that carries a containerId — never the
       * landing page. Rather than hand-compile all 588 lines and their
       * TaskFactory tail, register the one method, verbatim from
       * services/task-service.ts. */
      $provide.factory('TaskService', ['$http', function ($http) {
        return {
          getContainer: function (containerId) {
            return $http.get('/api/task?container=' + containerId);
          }
        };
      }]);
    }]);
}());
