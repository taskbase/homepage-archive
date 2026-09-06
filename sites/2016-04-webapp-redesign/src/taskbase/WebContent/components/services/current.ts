/**
 * Created by Bersling on 06/02/16.
 */

'use strict';
class Current {
  get onQuizEnd(): boolean {
    return this._onQuizEnd;
  }

  set onQuizEnd(value: boolean) {
    this._onQuizEnd = value;
  }

  get googleChartReady(): boolean {
    return this._googleChartReady;
  }

  set googleChartReady(value: boolean) {
    this._googleChartReady = value;
  }

  get viewAsStudent(): boolean {
    return this._viewAsStudent;
  }

  set viewAsStudent(value: boolean) {
    this._viewAsStudent = value;
  }

  get newEditorId(): number {
    this._editorId++;
    return this._editorId;
  }

  get newChartId(): number {
    this._chartId++;
    return this._chartId;
  }

  get scope(): any {
    return this._scope;
  }

  set scope(value: any) {
    this._scope = value;
  }
  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }
  get parent(): Task {
    return this._parent;
  }

  set parent(value: Task) {
    this._parent = value;
  }
  get callback(): Function {
    return this._callback;
  }

  set callback(value: Function) {
    this._callback = value;
  }


  get target(): Task {
    return this._target;
  }

  set target(value: Task) {
    this._target = value;
  }

  get containerId() {
    return this._containerId;
  }

  set containerId(value) {
    this._containerId = value;
  }


  get permissions(): Permissions {
    return this._permissions;
  }

  set permissions(value: Permissions) {
    this._permissions = value;
  }

  get objective() {
    return this._objective;
  }

  set objective(value) {
    this._objective = value;
  }

  get course() {
    return this._course;
  }

  set course(value) {
    this._course = value;
  }

  get objectives() {
    return this._objectives;
  }

  set objectives(value) {
    this._objectives = value;
  }

  get task() {
    return this._task;
  }

  set task(value) {
    this._task = value;
  }

  get step() {
    return this._step;
  }

  set step(value) {
    this._step = value;
  }

  get block() {
    return this._block;
  }

  set block(value) {
    this._block = value;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  get state(): IState {
    return this._state;
  }

  set state(value: IState) {
    this._state = value;
  }

  get stateParams() {
    return this._stateParams;
  }

  set stateParams(value) {
    this._stateParams = value;
  }

  private _objective: Task;
  private _course: Task;
  private _objectives: Task[];
  private _task: Task;
  private _step: Task;
  private _block: Task;
  private _tasks: Task[];
  private _permissions: Permissions;
  private _state: IState;
  private _stateParams;
  private _containerId;
  private _target: Task;
  private _callback: Function;
  private _parent: Task;
  private _index: number;
  private _scope: any;
  private _editorId: number = 0;
  private _chartId: number = 0;
  private _writelock: boolean; //unused so far
  private _viewAsStudent: boolean;
  private _googleChartReady: boolean;
  private _onQuizEnd: boolean;


  public promises: IPromise<any>[];

}

angular.module('taskbaseApp').service('Current', Current);
