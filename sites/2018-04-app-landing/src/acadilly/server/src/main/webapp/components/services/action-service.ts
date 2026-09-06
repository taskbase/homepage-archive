class ActionService {

  static $inject = ['$http', 'Utils', 'UserService', '$state', '$log', 'Notify'];

  constructor(private $http,
              private Utils:Utils,
              private UserService:UserService,
              private $state,
              private $log: ILogService,
              private Notify: Notify
  ) {
  }

  public submitGap (gap: Gap, task: Task) {

    let userSolution = gap.userSolution.trim();
    gap.submitting = true;

    let action: Action = this.actionFactory("ATTEMPT", task, this.$state.params.containerId);
    action.gap = gap.id;
    action.input = gap.userSolution;
    this.postAction(action).then(resp => {
      if (resp.data.evaluation.type === 'CORRECT') {
        gap.correct = true;
      } else if ('INCORRECT') {
        gap.correct = false;
      } else {
        this.$log.error('Something went wrong with the gap correction');
        this.Notify.error('Something went wrong with the gap correction');
      }
      gap.submitting = false;
      gap.submitted = true;

      //check if any gaps are left
      let allGapsSubmitted: boolean = true;
      Object.keys(task.gaps).forEach(key => {
        const gap: Gap = task.gaps[key];
        if (!gap.submitted) {
          allGapsSubmitted = false;
        }
      });
      if (allGapsSubmitted) {
        task.currentState = task.currentState || {};
        task.currentState.solutionSubmitted = true;
      }

    }, resp => {
      this.Notify.errorResponse(resp);
      gap.submitting = false;
    });

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

  updateRotation(action: Action): IHttpPromise<any>  {
    let evalPatch: Patch = {
      op: action.rotation != null ? PatchOperation.replace : PatchOperation.add,
      path: "/rotation",
      value: action.rotation
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

  actionSearch(params:ActionFilters):IHttpPromise<Action[]> {
    let config = {
      params: params
    };
    return this.$http.get(this.basicActionSearchUrl, config);
  }

  postAction(action:Action):IHttpPromise<Action> {

    const esthersCourses = [
      '58d2f28fa73cf00073628ed6',
      '585921cafdfc360017ba443e',
      '58807b30fdfc3600326cc7f3',
      '58807f1bfdfc3600326cc887',
      '57c41d74b54bfb001963bc87',
      '58807fe4fdfc3600326cc8c7',
      '5880891ffdfc3600326cc922',
      '586ab4aafdfc360017babd4c',
      '5a63134928c30b00828947f4',
      '586c0c6bfdfc360017bacc21',
      '589b36ebd37470006537fcc1',
      '58807cb8fdfc3600326cc870',
      '58807fa3fdfc3600326cc8b2',
      '588e0c760575060023d42a73',
      '5a76c6cf534aee007d0a3ff9',
      '59e7b17428c30b008075db3c',
      '5a132f737109d50062b8581c',
      '58a18347aecb2c0065fe9ee4',
      '588088e7fdfc3600326cc906',
      '58808968fdfc3600326cc945',
      '58247652fdfc36001517d214'
    ];

    const isEsthersCourse = esthersCourses.indexOf(this.$state.params.containerId) > -1;
    const isRelevantSubmission = action.type === 'TEXT_SUBMISSION' || action.type === 'FILE_SUBMISSION';
    if (isEsthersCourse && isRelevantSubmission) {
      this.sendEmailToEsther(action);
    }

    return this.$http.post(this.basicActionUrl, action);
  };


  sendEmailToEsther (action:Action) {
    const apiUrl = 'https://mailserver.taskbase.com/api/mail/send';
    const receiver = 'bersling@gmail.com';
    const receiver2 = 'esther.frei@easymath.ch';
    const courseId = action.container;
    const link = `https://www.taskbase.com/task/${action.task.key}?containerId=${courseId}`;
    const emailContent = `Es gibt eine neue Abgabe unter <a href="${link}">${link}</a>.`;

    const reqBody = {
      "personalizations": [
        {
          "to": [
            {
              "email": receiver
            },
            {
              "email": receiver2
            }
          ]
        }
      ],
      "from": {
        "email": "info@taskbase.com",
        "name": "Taskbase"
      },
      "subject": "Neue Abgabe",
      "content": [
        {
          "type": "text/html",
          "value": emailContent
        }
      ]
    };
    this.$http.post(apiUrl, reqBody);

  };

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

angular.module('acadillyApp').service('ActionService', ActionService);

