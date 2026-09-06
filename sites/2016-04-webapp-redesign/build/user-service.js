'use strict';

/* jshint browser: true */
/*global angular */

// hand-transpiled from components/services/user-service.ts

angular.module('taskbaseApp').factory('User',
  ($resource) => {
    return $resource('/api/user/:userId', null, {
      update: {
        method: 'PUT'
      }
    });
  });

class UserService {

  constructor(User, $http, $log, $q) {
    this.User = User;
    this.$http = $http;
    this.$log = $log;
    this.$q = $q;

    this.getCourseUsers = (containerId, role) => {
      return this.$http.get('/api/people?container=' + containerId + '&role=' + role);
    };

    this.changePassword = (passwordResetData) => {
      return this.$http.post('/api/pw-reset', passwordResetData);
    };
  }

  getUser() {
    return this.user;
  }

  getAndSetUser() {
    let promise;
    if (this.user){
      promise = this.$q.when(this.user);
    } else {
      promise = this.setUser();
    }
    return promise;
  }

  setUser(user) {
    var promise;
    if (user) {
      promise = this.$http.put('/api/user', user);
      promise.then((response) => {
        this.user = user;
      });
    } else {
      this.user = undefined;
      promise = this.$http.get('/api/user');
      promise.then((response) => {
        this.user = response.data;
      });
    }
    return promise;
  }

  getAndSetLoggedIn() {
    let promise = this.$http.get('/api/login');
    promise.then((resp) => {
      this.setLoggedIn(resp.data.loggedIn);
    });
    return promise;
  }

  setLoggedIn(loggedIn) {
    if (loggedIn) {
      this._loggedIn = true;
    } else {
      this._loggedIn = false;
    }
  }

  loggedIn() {
    return this._loggedIn;
  }

  numTeachers () {
    return this.$http.get('https://www.taskbase.com/api/usercount?role=COURSE_OWNER');
  }

  numUsersTotal () {
    return this.$http.get('https://www.taskbase.com/api/usercount');
  }

}
UserService.$inject = ['User', '$http', '$log', '$q'];

angular.module('taskbaseApp').service('UserService', UserService);
