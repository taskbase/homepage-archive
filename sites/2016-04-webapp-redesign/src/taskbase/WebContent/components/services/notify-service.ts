class Notify {

  static $inject = ['Notification', '$filter'];

  constructor(
    private Notification,
    private $filter
  ){}

  primary (msg) {
    var notifyObject = {
      message: this.$filter('translate')(msg),
      delay: 3000,
      positionX: 'center'
    };
    return this.Notification.success(notifyObject);
  }
  errorResponse (response, params?: any) {
    var notifyObject = {
      message: response.statusText,
      delay: 3000,
      positionX: 'center'
    };
    angular.extend(notifyObject, params);
    return this.Notification.error(notifyObject);
  }
  error (msg, params?) {
    var notifyObject = {
      message: this.$filter('translate')(msg),
      delay: 3000,
      positionX: 'center'
    };
    angular.extend(notifyObject, params);
    return this.Notification.error(notifyObject);
  }

}

angular.module('taskbaseApp').service('Notify', Notify);

