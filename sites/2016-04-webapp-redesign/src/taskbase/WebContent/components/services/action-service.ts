class ActionService {

  static $inject = ['$http', 'Utils', 'UserService', '$stateParams'];

  constructor(private $http,
              private Utils:Utils,
              private UserService:UserService,
              private $stateParams) {
  }

  gradeAction(action: Action, evaluation: Evaluation): IHttpPromise<any> {

    let evalPatch: Patch = {
      op: action.evaluation != null ? PatchOperation.replace : PatchOperation.add,
      path: "/evaluation",
      value: evaluation
    };

    return this.$http.patch(this.basicActionUrl + '?id=' + action.hexId,
        [evalPatch]);
  }

  actionFactory(type: ActionTypeEnum, task?: Task, container?: string): Action {
    let action: Action = {
      startTime: new Date().getTime(),
      task: task ? task.id : undefined,
      container: container,
      user: this.UserService.getUser()._id,
      taskType: task.type,
      type: type
    }
    return action;
  }

  getAction(taskId?:string, container?:string):IHttpPromise<Action> {
    let config = {
      params: {
        task: taskId,
        container: container
      }
    }
    let httpReq = this.$http.get(this.basicActionUrl, config);
    return httpReq;
  };

  setStarred(task:Task) {
    let user = this.UserService.getUser();
    let userId;
    if (user) {
      userId = user._id
    }
    this.actionSearch({
      type: ['TAG', 'UNTAG'],
      task: [task.id.key],
      input: ['starred'],
      user: [userId],
      order: '-submitTime',
      limit: 1
    }).then(response => {
      if (response.data.length < 1) {
        task.isStarred = false;
      } else {
        task.isStarred = response.data[0].type === 'TAG';
      }
    });
  }


  actionSearch(params:ActionFilters):IHttpPromise<Action[]> {
    let config = {
      params: params
    };
    return this.$http.get(this.basicActionSearchUrl, config);
  }

  postAction(action:Action):IHttpPromise<Action> {
    return this.$http.post(this.basicActionUrl, action);
  };

  star(task:ComposedId):IHttpPromise<Action> {
    let action:Action = {
      type: 'TAG',
      input: 'starred',
      task: task,
      user: this.UserService.getUser()._id,
      container: this.$stateParams.containerId
    };
    return this.postAction(action);
  }

  unstar(task:ComposedId):IHttpPromise<Action> {
    let action:Action = {
      type: 'UNTAG',
      input: 'starred',
      task: task,
      user: this.UserService.getUser()._id,
      container: this.$stateParams.containerId
    };
    return this.postAction(action);
  }

  deleteAction(id:string):IHttpPromise<any> {

    return this.$http.delete(this.basicActionUrl,{params:{id:id}});
  }

  private get basicActionUrl():string {
    return '/api/action'
  }

  private get basicActionSearchUrl():string {
    return '/api/action-search'
  }

}

interface ActionFilters {
  task?:string[];
  user?:string[];
  order?:string;
  offset?:number;
  limit?:number;
  minDuration?:number;
  maxDuration?:number;
  after?:number;
  before?:number;
  type?:ActionTypeEnum[];
  evaluationType?:EvaluationTypeEnum;
  container?:string[];
  taskType?:string[];
  skill?:string[];
  input?:string[];
}

angular.module('taskbaseApp').service('ActionService', ActionService);

