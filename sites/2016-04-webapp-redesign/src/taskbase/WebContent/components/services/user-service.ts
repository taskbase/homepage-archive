'use strict';

/* jshint browser: true */
/*global angular */

angular.module('taskbaseApp').factory('User', 
  ($resource) => {
    return $resource('/api/user/:userId', null, {
      update: {
        method: 'PUT'
      }
    });
  });

class UserService {

  static $inject = ['User', '$http', '$log', '$q'];

  constructor(
    private User,
    private $http: IHttpService,
    private $log,
    private $q: IQService
  ){}

  private user;

  public getUser(): User {
    return this.user;
  }

  public getAndSetUser(): IPromise<User> {
    let promise:IPromise<User>;
    if (this.user){
      promise = this.$q.when(this.user);
    } else {
      promise = this.setUser();
    }
    return promise;
  }

  public setUser(user?: User): IHttpPromise<User> {
    if (user) {
      var promise = this.$http.put('/api/user', user);
      promise.then((response) => {
        this.user = user;
      });
    } else {
      this.user = undefined;
      var promise = this.$http.get('/api/user');
      promise.then((response) => {
        this.user = response.data;
      });
    }
    return promise;
  }

  public getAndSetLoggedIn(): IHttpPromise<LoggedIn> {
    let promise: IHttpPromise<LoggedIn> = this.$http.get('/api/login');
    promise.then((resp: IHttpPromiseCallbackArg<LoggedIn>) => {
      this.setLoggedIn(resp.data.loggedIn);
    });
    return promise;
  }

  public setLoggedIn(loggedIn: boolean): void {
    if (loggedIn) {
      this._loggedIn = true;
    } else {
      this._loggedIn = false;
    }
  }

  private _loggedIn: boolean;

  public loggedIn(): boolean {
    return this._loggedIn;
  }

  public getCourseUsers = (containerId: string, role: RoleEnum): IHttpPromise<PeopleResponse[]> => {
    return this.$http.get('/api/people?container=' + containerId + '&role=' + role);
  }

  public changePassword = (passwordResetData: PasswordResetData): IHttpPromise<any> => {
    return this.$http.post('/api/pw-reset', passwordResetData);
  }

  public numTeachers (): IHttpPromise<any> {
    return this.$http.get('https://www.taskbase.com/api/usercount?role=COURSE_OWNER');
  }

  public numUsersTotal (): IHttpPromise<UserCountResponse> {
    return this.$http.get('https://www.taskbase.com/api/usercount');
  }

}

interface PasswordResetData {
  email: string;
  key: string;
  password: string;
}

interface PeopleResponse {
  role: RoleEnum;
  user: User;
}

interface UserCountResponse {
  count: number;
}

interface LoggedIn {
  "loggedIn": boolean;
}

angular.module('taskbaseApp').service('UserService', UserService);

