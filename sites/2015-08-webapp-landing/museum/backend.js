/**
 * The Java/Tomcat backend is gone, so $httpBackend is decorated: anything
 * under api/ is answered from the fixtures below, everything else (all the
 * templateUrl requests) goes to the real static server.
 *
 * Fixture values are the era's own: the field list is Settings.notConfidential
 * and the values are LocalSettings' production defaults (cssId "taskbase",
 * ldapLogin false, publicSignup true) from
 * taskbase/src/com/edtechlab/taskbase/settings/ at the same commit. 401 is
 * what the real server answered an anonymous visitor on the user endpoints.
 */
(function () {
  'use strict';

  var FIXTURES = [
    [/^api\/settings$/, 200, {
      filename: 'taskbase.properties',
      host: 'www.taskbase.org',
      cssId: 'taskbase',
      ldapLogin: false,
      publicSignup: true,
      userVerification: true,
      emailEnabled: true,
      adminEmail: 'info@edtechlab.ch',
      dbName: 'taskbase',
      minify: true,
      analyticsEnabled: false
    }],
    [/^api\/login$/, 200, { loggedIn: false }],
    // Lucene-backed task search. It only fires once a visitor submits a query,
    // and its index is not in the repo, so it answers empty and the widget
    // shows its own "No results found." state.
    [/^api\/task-search$/, 200, []],
    [/^api\/tag$/, 200, []],
    [/^api\/(user|course|objective)(\/|$)/, 401, '']
  ];

  angular.module('taskbaseApp').config(['$provide', function ($provide) {
    $provide.decorator('$httpBackend', ['$delegate', function ($delegate) {
      return function (method, url) {
        var path = String(url).replace(/^\/+/, '').split('?')[0];
        for (var i = 0; i < FIXTURES.length; i++) {
          if (FIXTURES[i][0].test(path)) {
            var status = FIXTURES[i][1];
            var body = FIXTURES[i][2];
            var callback = arguments[3];
            window.setTimeout(function () {
              callback(status, angular.isString(body) ? body : angular.toJson(body),
                       'content-type: application/json', status === 200 ? 'OK' : 'Unauthorized');
            }, 0);
            return;
          }
        }
        return $delegate.apply(null, arguments);
      };
    }]);
  }]);
}());
