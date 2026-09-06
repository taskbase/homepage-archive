/**
 * MUSEUM GLUE -- not part of the 2016 source tree.
 *
 * Everything in this file exists only so the era's own AngularJS 1.5 code can
 * boot against a static file server with no Java/Tomcat backend behind it.
 * The era code itself is in ../build/ (hand-transpiled from the committed .ts).
 *
 * It does four things:
 *   1. answers `api/...` XHRs from a fixture map ($httpBackend decorator) and
 *      delegates everything else -- templates above all -- to the real one;
 *   2. makes the whitelabel host checks report www.taskbase.com;
 *   3. replaces GoogleAnalyticsService with a no-op (the real one injects the
 *      analytics.js tag from its constructor; the contract strips trackers);
 *   4. blocks ui-router transitions to states whose controllers were not
 *      ported, and paints a small corner badge.
 */
(function () {
  'use strict';

  // The era's app.html declared this Inspectlet queue as a bare array. Keeping
  // the array (and not the vendor script) lets TrackingService run untouched.
  window.__insp = window.__insp || [];

  var PORTED_STATES = ['root', 'landing'];

  // ---------------------------------------------------------------- fixtures
  //
  // Provenance of every value below:
  //   /api/login       - `{"loggedIn": false}` is what the era backend answered
  //                      an anonymous visitor; it is what flips `appReady` and
  //                      selects the logged-out header/footer.
  //   /api/user        - anonymous visitors got no user object. Answered 200
  //                      with an empty body so UserService.setUser() resolves.
  //   /api/permission  - the two course permissions PermissionService asks for,
  //                      both false for an anonymous visitor.
  //   usercount / task-search?indexsize
  //                    - RECONSTRUCTED. These three numbers drove the counter
  //                      strip. The API is long dead and the Wayback Machine
  //                      has no capture of these endpoints, so the values are
  //                      deliberately round rather than posing as telemetry.
  //                      The shape of each response is taken from the era code
  //                      that parses it (user-service.ts, tb-landing-component.ts).
  var FIXTURES = [
    [/\/api\/login(\?|$)/,                  200, {loggedIn: false}],
    [/\/api\/user(\/|\?|$)/,                200, ''],
    [/\/api\/permission(\?|$)/,             200, {CREATE_COURSE: false, UPDATE_COURSE: false}],
    [/\/api\/usercount\?role=COURSE_OWNER/, 200, {count: 260}],
    [/\/api\/usercount(\?|$)/,              200, {count: 4200}],
    [/\/api\/task-search\?indexsize/,       200, 'Search index size is 46000'],
    [/\/api\//,                             501, {error: 'no backend in the museum'}]
  ];

  function fixtureFor(url) {
    for (var i = 0; i < FIXTURES.length; i++) {
      if (FIXTURES[i][0].test(url)) return FIXTURES[i];
    }
    return null;
  }

  angular.module('taskbaseApp').config(['$provide', function ($provide) {

    $provide.decorator('$httpBackend', ['$delegate', '$browser', function ($delegate, $browser) {
      return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
        var hit = fixtureFor(url);
        if (!hit) {
          return $delegate.apply(null, arguments);
        }
        var body = hit[2];
        var text = (typeof body === 'string') ? body : angular.toJson(body);
        // Answer out of band, the way a real XHR would, so digests stay sane.
        $browser.defer(function () {
          callback(hit[1], text, '', hit[1] === 200 ? 'OK' : 'Not Implemented');
        });
      };
    }]);

    // Whitelabel: the era switched brand on the hostname. `localhost` already
    // falls through to the taskbase branch of every `urlContains('e-maths')`
    // check, but `urlContains('taskbase')` would be false, so the one function
    // that decides is overridden here instead of editing the era templates.
    // The other brands' markup is untouched and still in the templates.
    $provide.decorator('Utils', ['$delegate', function ($delegate) {
      $delegate.urlContains = function (hostSlice) {
        return 'www.taskbase.com'.indexOf(hostSlice) > -1;
      };
      return $delegate;
    }]);

  }]);

  // The real GoogleAnalyticsService writes the analytics.js <script> tag from
  // its constructor and calls ga('create'/'send'). WebApp hard-depends on it.
  angular.module('taskbaseApp').service('GoogleAnalyticsService', function () {});

  // The era had no $urlRouterProvider config: '/' hit the `root` state, whose
  // view is an empty div, and routes.ts' handleBadStates() then bounced an
  // anonymous visitor to `landing`. Short-circuiting that here keeps the
  // exhibit's entry URL from flashing a blank frame first.
  angular.module('taskbaseApp').config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/landing');
  }]);

  angular.module('taskbaseApp').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (ev, to) {
      if (to && to.name && PORTED_STATES.indexOf(to.name) === -1) {
        ev.preventDefault();
      }
    });
  }]);

  // -------------------------------------------------------------- the badge
  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.createElement('div');
    wrap.className = 'mu-badge';
    wrap.innerHTML =
      '<div class="mu-badge-body" hidden>' +
        '<strong>Taskbase, 2016&ndash;04</strong><br>' +
        'The era&rsquo;s own AngularJS 1.5.9 code, running for real from ' +
        '<code>tb.git@feedfcf6e5</code>. The <code>.ts</code> sources were ' +
        'hand-transpiled (no tsc here) and the Java backend is answered from a ' +
        'fixture map. Only the landing route is wired up &mdash; the nav links ' +
        'are inert. See <code>meta.json</code>.' +
      '</div>' +
      '<button type="button" class="mu-badge-pill">exhibit</button>';
    var pill = wrap.querySelector('.mu-badge-pill');
    var bodyEl = wrap.querySelector('.mu-badge-body');
    pill.addEventListener('click', function () { bodyEl.hidden = !bodyEl.hidden; });
    document.body.appendChild(wrap);
  });

})();
