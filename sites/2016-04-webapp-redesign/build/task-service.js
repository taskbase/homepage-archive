'use strict';
// PARTIAL hand-transpile of components/services/task-service.ts.
// The era class is ~15 KB and pulls in TaskFactory, Login, Notify and the
// whole task model. Only the two methods the landing page and its signup
// component actually call are ported; both are byte-identical to the era
// source. Everything else the era class offered is absent by design.
class TaskService {

  constructor($http, Utils, Current, $stateParams, $log, $rootScope, Login, $state, $q, Notify){
    this.$http = $http;
    this.Utils = Utils;
    this.Current = Current;
    this.$stateParams = $stateParams;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.Login = Login;
    this.$state = $state;
    this.$q = $q;
    this.Notify = Notify;
  }

  copyTemplateCourse() {
    return this.$http.get('/api/copycontainer?template=main&suppresscopysuffix=true');
  }

  numTasksTotal() {
    return this.$http.get('https://www.taskbase.com/api/task-search?indexsize');
  }

}
TaskService.$inject = ['$http', 'Utils', 'Current', '$stateParams', '$log', '$rootScope', 'Login', '$state', '$q', 'Notify'];

angular.module('taskbaseApp').service('TaskService', TaskService);
