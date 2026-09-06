// hand-transpiled from components/services/notify-service.ts

class Notify {

  constructor(Notification, $filter){
    this.Notification = Notification;
    this.$filter = $filter;
  }

  primary (msg) {
    var notifyObject = {
      message: this.$filter('translate')(msg),
      delay: 3000,
      positionX: 'center'
    };
    return this.Notification.success(notifyObject);
  }
  errorResponse (response, params) {
    var notifyObject = {
      message: response.statusText,
      delay: 3000,
      positionX: 'center'
    };
    angular.extend(notifyObject, params);
    return this.Notification.error(notifyObject);
  }
  error (msg, params) {
    var notifyObject = {
      message: this.$filter('translate')(msg),
      delay: 3000,
      positionX: 'center'
    };
    angular.extend(notifyObject, params);
    return this.Notification.error(notifyObject);
  }

}
Notify.$inject = ['Notification', '$filter'];

angular.module('taskbaseApp').service('Notify', Notify);
