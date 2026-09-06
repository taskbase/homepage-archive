'use strict';
import IHttpPromise = angular.IHttpPromise;
import ILogService = angular.ILogService;
import IHttpRequestConfigHeaders = angular.IHttpRequestConfigHeaders;
class TaskService {
  static $inject = ['$http', 'Utils', 'Current', '$stateParams', '$log', '$rootScope', 'Login', '$state', '$q',
  'TaskFactory', 'Notify'];
  constructor(
      // Add the parameter and type definition.
      private $http: angular.IHttpService,
      private Utils: Utils,
      private Current: Current,
      private $stateParams,
      private $log: ILogService,
      private $rootScope,
      private Login,
      private $state,
      private $q: IQService,
      private TaskFactory: TaskFactory,
      private Notify
  ){}

  private saveNewTask(task: Task, parentKey: string, unshift?: boolean): IHttpPromise<TaskResponse> {
    let config = {
      params: {
        container: this.$stateParams.containerId,
        id: parentKey,
        index: unshift ? 0 : -1
      }
    };

    let httpReq: angular.IHttpPromise<TaskResponse> = this.$http.post('/api/task', task, config);
    return httpReq;
  };
  public createAndAddTaskUtil(type: TaskTypeEnum, parent: Task, unshift?: boolean): IHttpPromise<any> {
    var newTask = this.TaskFactory.createTask(type);
    let promise: IHttpPromise<any> = this.saveNewTask(newTask, parent.id.key, unshift);
    promise.then((response) => {
      let t = response.data.task;
      t.childrenTasks = [];

      if (unshift) {
        parent.childrenTasks.unshift(t);
        parent.children.unshift(t.id);
      } else {
        parent.childrenTasks.push(t);
        parent.children.push(t.id);
      }
    });
    return promise;
  };

  public copyCourse(id: string, suppressCopySuffix?: boolean): IHttpPromise<Task> {

    let config = {
      params: {
        suppresscopysuffix: suppressCopySuffix,
        container: id
      }
    };

    return this.$http.get('/api/copycontainer', config);
  }

  public copyTemplateCourse(): IHttpPromise<Task> {
    return this.$http.get('/api/copycontainer?template=main&suppresscopysuffix=true');
  }

  public getTemplateCourse(): IHttpPromise<Task> {
    return this.$http.get('/api/templatecontainer');
  }


  public numTasksTotal(): IHttpPromise<string> {
    return this.$http.get('https://www.taskbase.com/api/task-search?indexsize');
  }

  public getParent(task: Task): IHttpPromise<Task> {
    let config: any = this.configFactory(task);
    config.params.parent = true;
    var httpReq: angular.IHttpPromise<any> = this.$http.get('/api/task', config);
    return httpReq;
  };

  public getVersions(task: Task): IHttpPromise<Version[]> {
    let config: any = this.configFactory(task);
    config.params.versions = true;
    var httpReq: angular.IHttpPromise<any> = this.$http.get('/api/task', config);
    return httpReq;
  };

  public restoreCourseVersion(version: Version) {
    this.$http.put('/api/container-version?container=' + this.$stateParams.containerId, version).then(() => {
      this.$state.reload();
    });
  }

  private convertDates(task: Task) {
    let dates = ['start', 'end'];
    dates.map(d => {
      if (task[d]) {
        task[d] = this.convertAnyDateFormatToNumber(task[d]);
      }
    });
  }

  private convertAnyDateFormatToNumber(d: any): number {
    return new Date(d).getTime();
  }

  public update(task: Task): angular.IHttpPromise<TaskResponse> {
    let that = this;
    let key;
    if (task.id) {
      key = task.id.key
    }

    this.convertDates(task);

    let httpReq: IHttpPromise<TaskResponse> =
        this.$http.put(that.Utils.addQueryParams('/api/task',
            {id: key, container: that.$stateParams.containerId}), task);
    httpReq.then((response) => {
      that.Utils.updateIds(response.data.updated);
    });
    return httpReq;
  };
  public getLatest(key: string, container?: string): IHttpPromise<Task> {

    let args = arguments.callee.caller.toString();

    let config = {
      params: {
        container: container || this.$stateParams.containerId,
        id: undefined
      }
    };

    let startRequest = (): IHttpPromise<Task> => {
      let req: IHttpPromise<Task>;
      if (key === 'tag-starred') {
        req = this.$http.get('/api/autoobjective/tag-starred', config);
      } else if(key) {
        config.params.id = key;
        req = this.$http.get('/api/task', config);
      } else {
        this.$log.error('No valid key. The key passed in was:');
        this.$log.debug(key);
        this.$log.debug('Problem in: ' + args);
      }
      return req;
    };

    let req:IHttpPromise<Task> = startRequest();

    return req;

  };

  isAdded(task: Task, containerId?: string) {
    let config = {
      params: {
        container: containerId || this.$stateParams.containerId,
        task: task.id.key,
        open: false
      }
    }
    this.$http.get('/api/task-search', config).then( (resp: IHttpPromiseCallbackArg<Task[]>) => {
      if (resp.data.length > 0) {
        task.isAdded = true;
      }
    });
  }

  getContainer(containerId: string):IHttpPromise<Task>{
    return this.$http.get('/api/task?container=' + containerId);
  };

  getExactVersion(id: ComposedId, container?: string): angular.IHttpPromise<Task> {
    let config = {
      params: {
        id: id.key + this.Utils.versionSeparator + id.version,
        container:  container || this.$stateParams.containerId
      }
    }
    return this.$http.get('/api/task', config);
  };

  swap(parent: Task, task1index: number, task2index: number, updateChildrenTasks?: boolean): angular.IHttpPromise<TaskResponse> {
    let patch: Patch = {
      op: PatchOperation[PatchOperation.move],
      from: "/children/" + task1index,
      path: "/children/" + task2index
    };
    let req = this.$http.patch('/api/task?id=' + parent.id.key + '&container=' + this.$stateParams.containerId, [patch]);
    if (updateChildrenTasks) {
      req.then(resp => {
        this.Utils.swap(parent.childrenTasks, task1index, task2index);
      });
    }
    return req;
  };
  addChildTask(taskParentContainer: TaskParentContainer): angular.IHttpPromise<TaskResponse> {
    let config = {
      params: {
        id: taskParentContainer.parent,
        container: taskParentContainer.container
      }
    }
    let patch: Patch = {
      op: PatchOperation.add,
      path: "/children/-",
      value: {"key": taskParentContainer.task.id.key, "version": taskParentContainer.task.id.version }
    }
    let reqUrl = this.basicQueryUrl;
    let promise = this.$http.patch(reqUrl, [patch], config);
    promise.then(resp => {

    }, errorResp => {
      this.Notify.errorResponse(errorResp);
    })
    return promise;
  };
  addTaskToCourse(task: Task) {
    return this.addChildTask({task: task, container: this.$stateParams.containerId});
  };
  suggestQuery(params): IHttpPromise<any> {
    let that = this;
    return that.$http.get('/api/querysuggest', params);
  }
  public getIdsFromList(tasks: Task[]): ComposedId[] {
    let ids: ComposedId[] = [];
    for (let task of tasks) {
      ids.push(task.id);
    }
    return ids;
  }
  public recommend(parentId): IHttpPromise<Task[]> {
    let config = {
      params: {
        container: this.$stateParams.containerId,
        parent: parentId,
        n: 1
      }
    };
    return this.$http.get('/api/tasks-recommend', config);
  }

  public getChildren = (task: Task, container?: string): IHttpPromise<Task[]> => {
    let promise: IHttpPromise<Task[]>;
    let config = {
      params: {
        container: container || this.$stateParams.containerId,
        id: task.id.key,
        children: true
      }
    };
    return this.$http.get('/api/task', config);
  };

  //adding stuff
  public addItemToList (item: any, task: Task, propertyName: TaskProperty, unshift?: boolean, container?: string): IHttpPromise<TaskResponse> {

    let promise: IHttpPromise<TaskResponse>;
    let config = this.configFactory(task);
    if (container) {
      config.params.container = container;
    }

    if (task[propertyName] && task[propertyName].length > 0) {
      let patch: Patch = {
        op: PatchOperation.add,
        path: "/" + propertyName + "/-",
        value: item
      };
      promise = this.$http.patch(this.basicQueryUrl, [patch], config);
      promise.then(r => task[propertyName].push(item));
    } else {
      let patch: Patch = {
        op: PatchOperation.add,
        path: "/" + propertyName,
        value: [item]
      };
      promise = this.$http.patch(this.basicQueryUrl, [patch], config);
      promise.then(taskResponse => {
        task[propertyName] = [item];
        task.id = taskResponse.data.task.id;
      });
    }
    return promise;

  }


  // use childrenTasks to update children
  public updateChildrenUsingChildrenTasks(parent: Task, scope?: IScope): IHttpPromise<TaskResponse> {
    let children: ComposedId[];
    parent.childrenTasks = parent.childrenTasks || [];
    children = parent.childrenTasks.map(elem => elem.id);
    let promise = this.updateProperty(children, parent, 'children');

    promise.then(taskResponse => {
      //update children with what was posted
      parent.children = children;
      if (scope) {
        this.updateIds(scope, taskResponse.data.updated);
      } else {
        this.$log.error('No scope')
      }
    });

    return promise;
  }


  //deleting stuff
  public deleteListItem (index: number, task: Task, propertyName: TaskProperty): IHttpPromise<TaskResponse> {
    let promise: IHttpPromise<TaskResponse>;
    let config = this.configFactory(task);

    let patch: Patch = {
      op: PatchOperation.remove,
      path: "/" + propertyName + "/" + index
    };

    promise = this.$http.patch(this.basicQueryUrl, [patch], config);
    promise.then(taskResponse => {
      task[propertyName].splice(index, 1);
      task.id = taskResponse.data.task.id;
    });

    return promise;
  }

  //updating lists
  public updateListItem (index: number, item: any, task: Task, propertyName: TaskProperty, scope: IScope): IHttpPromise<TaskResponse> {
    let promise: IHttpPromise<TaskResponse>;
    let config = this.configFactory(task);

    let patch: Patch = {
      op: PatchOperation.replace,
      path: "/" + propertyName + "/" + index,
      value: item
    };

    promise = this.$http.patch(this.basicQueryUrl, [patch], config);
    promise.then(taskResponse => {
      task[propertyName][index] = item;
      if (scope) {
        this.updateIds(scope, taskResponse.data.updated);
      }
    });
    return promise;
  }

  //update props
  public updateProperty (item: any, task: Task, propertyName: TaskProperty, scope?: IScope): IHttpPromise<TaskResponse> {

    let promise: IHttpPromise<TaskResponse>;
    let config = this.configFactory(task);

    //handle special cases
    if (propertyName === 'start' || propertyName === 'end') {
      item = this.convertAnyDateFormatToNumber(item);
    }

    //end special cases

    let patch: Patch = {
      op: task[propertyName] !== undefined ? PatchOperation.replace : PatchOperation.add,
      path: "/" + propertyName,
      value: item
    };

    promise = this.$http.patch(this.basicQueryUrl, [patch], config);

    promise.then(resp => {

    }, errorResp => {
      this.Notify.errorResponse(errorResp);
    });

    if (scope) {
      promise.then(taskResponse => {
        task[propertyName] = item;
        this.updateIds(scope, taskResponse.data.updated);
      });
    }

    return promise;
  }

  private reverseUpdateIds() {
  }

  private updateIds(scope: IScope, updated: Updated) {
    //traverse up the angular-model hierarchy and update all updated ids
    let parent = <any>scope.$parent;
    while(parent) {
      let parentController = parent.$ctrl;
      if (parentController) {
        //iterate through all properties of controller and check if they have an id
        for (var property in parentController) {
          //make sure to exclude stuff like prototype
          if (parentController.hasOwnProperty(property)) {
            let model = parentController[property];
            //check for id
            if (model && model.hasOwnProperty('id')) {
              //check if id is in updated
              let serialId: string = this.Utils.serializeId(model.id);
              let wasUpdated: boolean = updated.hasOwnProperty(serialId);
              if (wasUpdated) {
                //update id of model
                let updatedId: string = updated[serialId];
                model.id = this.Utils.deserializeId(updatedId);
              }
            }
          }
        }
      }

      parent = parent.$parent;

    }
  }

  //delete props
  public deleteProperty (task: Task, propertyName: TaskProperty, scope: IScope): IHttpPromise<TaskResponse> {
    let promise: IHttpPromise<TaskResponse>;
    let config = this.configFactory(task);
    let patch: Patch = {
      op: PatchOperation.replace,
      path: "/" + propertyName
    };
    promise = this.$http.patch(this.basicQueryUrl, [patch], config);
    promise.then(taskResponse => {
      delete task[propertyName];
      this.updateIds(scope, taskResponse.data.updated);
    });
    return promise;
  }

  private configFactory (task: Task) {
    return {
      params: {
        id: task.id.key,
        container: this.$stateParams.containerId
      }
    }
  };

  /*
  public setupSyncFromChildrenTasksToChildren = (task: Task) => {
    task.childrenTasks.push = (data) => {
      task.children.push(data.id);
      return Array.prototype.push.apply(this, arguments);
    };
    task.childrenTasks.splice = (data) => {
      Array.prototype.splice.apply(task.children, arguments);
      return Array.prototype.splice.apply(this, arguments);
    }
  }*/

  private checkIfPropertyExists(task: Task, propertyName: string) {
    let config = this.configFactory(task);
    let patch: Patch = {
      op: PatchOperation.test,
      path: "/" + propertyName,
      value: null
    };
    let promise = this.$http.patch(this.basicQueryUrl, [patch], config);
    return promise;
  }

  private get basicQueryUrl():string {return '/api/task'}

  public get getUser():IHttpPromise<User> {
    let promise: IHttpPromise<User> = this.$http.get('/api/user');

    promise.then(resp => {
      //doSomething with doSomethingWithMe
    });

    return promise;
  };

  public task2wysiwyg(task: Task):IHttpPromise<Task> {
    let config = this.configFactory(task);
    let promise: IHttpPromise<Task> = this.$http.get('/api/task2wysiwyg', config);
    return promise;
  };

  public quiz(taskKey: string): IHttpPromise<QuizResponse> {
    let config = {
      params: {
        container: this.$state.params.containerId,
        parent: taskKey
      }
    };
    let promise = this.$http.get('/api/quiz', config);
    return promise;
  }

}
interface TaskParentContainer {
  task: Task;
  container?: string;
  parent?: string;
}

interface Version {
  versionId: string,
  lastModified: string,
  deletedMarker: boolean,
  latest: boolean
}

interface QuizResponse {
  currentTask: Task,
  stats: {
    correct: boolean,
    skip: boolean
  }[],
  pageNum: number,
  numTasks: number
}

angular.module('taskbaseApp').service('TaskService', TaskService);
