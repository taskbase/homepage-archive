/**
 * Created by Bersling on 06/02/16.
 */

'use strict';
// hand-transpiled from components/services/current.ts
class Current {
  constructor() {
    this._editorId = 0;
    this._chartId = 0;
  }
  get onQuizEnd() { return this._onQuizEnd; }
  set onQuizEnd(value) { this._onQuizEnd = value; }
  get googleChartReady() { return this._googleChartReady; }
  set googleChartReady(value) { this._googleChartReady = value; }
  get viewAsStudent() { return this._viewAsStudent; }
  set viewAsStudent(value) { this._viewAsStudent = value; }
  get newEditorId() { this._editorId++; return this._editorId; }
  get newChartId() { this._chartId++; return this._chartId; }
  get scope() { return this._scope; }
  set scope(value) { this._scope = value; }
  get index() { return this._index; }
  set index(value) { this._index = value; }
  get parent() { return this._parent; }
  set parent(value) { this._parent = value; }
  get callback() { return this._callback; }
  set callback(value) { this._callback = value; }
  get target() { return this._target; }
  set target(value) { this._target = value; }
  get containerId() { return this._containerId; }
  set containerId(value) { this._containerId = value; }
  get permissions() { return this._permissions; }
  set permissions(value) { this._permissions = value; }
  get objective() { return this._objective; }
  set objective(value) { this._objective = value; }
  get course() { return this._course; }
  set course(value) { this._course = value; }
  get objectives() { return this._objectives; }
  set objectives(value) { this._objectives = value; }
  get task() { return this._task; }
  set task(value) { this._task = value; }
  get step() { return this._step; }
  set step(value) { this._step = value; }
  get block() { return this._block; }
  set block(value) { this._block = value; }
  get tasks() { return this._tasks; }
  set tasks(value) { this._tasks = value; }
  get state() { return this._state; }
  set state(value) { this._state = value; }
  get stateParams() { return this._stateParams; }
  set stateParams(value) { this._stateParams = value; }
}

angular.module('taskbaseApp').service('Current', Current);
