import {
  Correctness,
  GradingFeedback,
  GradingRequest,
  OpenTaskInput,
  SpellCheckInput,
  SpellCheckPart,
  StepFeatureType,
  StepWithGroups,
  StudentInput,
  StudentInputType,
  Task,
  TaskFilters,
  TaskType,
} from "@taskbase/lap-sdk-types";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  GradingService,
  taskFilterFactory,
  TaskService,
} from "@taskbase/task/core";
import { RequestState } from "@taskbase/utils";
import { AuthService } from "@taskbase/user";
import { environment } from "../../../environments/environment";
import { NotifyService } from "@taskbase/toast";
import { forkJoin, Observable, Subscription } from "rxjs";
import { Marker } from "@taskbase/marker";
import { editorStyles } from "../grammar/marker-editor-style";

@Component({
  selector: "app-task-by-title",
  templateUrl: "./task-by-title.component.html",
  styleUrls: ["./task-by-title.component.scss"],
})
export class TaskByTitleComponent implements OnInit, OnDestroy {
  @Input() private taskTitle: string | null = null;
  @Input() private description: string = "";

  @Output() private inputChange = new EventEmitter<string>();
  @Output() private next = new EventEmitter<void>();
  @Output() private retry = new EventEmitter<void>();

  tasks: Task[] = [];
  filteredTasksRequest = RequestState.NONE;
  gradingRequests = RequestState.NONE;
  requestStateEnum = RequestState;
  gradings: GradingFeedback[] = [];

  private _inputText: string = "";
  get inputText() {
    return this._inputText;
  }

  set inputText(inputText: string) {
    this._inputText = inputText;
    this.inputChange.emit(this.inputText);
  }

  mistakes = [];
  editorStyles = editorStyles;

  subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private notify: NotifyService,
    private gradingService: GradingService
  ) {}

  ngOnInit() {
    this.authService
      .login(environment.studentEmail, environment.studentPassword)
      .subscribe(
        () => {
          this.loadTaskByTitle();
        },
        () => {
          this.notify.error("Could not log in");
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadTaskByTitle() {
    if (this.taskTitle != null) {
      const filters: TaskFilters = taskFilterFactory({
        taskTitle: this.taskTitle,
      });
      this.filteredTasksRequest = RequestState.PENDING;
      this.taskService.getTasksFiltered(filters).subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.filteredTasksRequest = RequestState.SUCCESS;
        },
        () => {
          this.filteredTasksRequest = RequestState.ERROR;
        }
      );
    } else {
      throw new Error("Expected task title");
    }
  }

  grade() {
    const gradingRequests: Observable<any>[] = [];
    this.gradingRequests = RequestState.PENDING;
    this.tasks.forEach((task) => {
      let input: StudentInput;
      if (task.type === TaskType.SPELL_CHECK) {
        input = {
          type: StudentInputType.SPELL_CHECK,
          text: this.inputText,
        } as SpellCheckInput;
      } else if (task.type === TaskType.OPEN) {
        input = {
          type: StudentInputType.OPEN_TASK,
          openInput: this.inputText,
        } as OpenTaskInput;
      } else {
        this.notify.error(
          `Grading for task type ${task.type} not implemented in this demo.`
        );
        return;
      }
      const gradingRequestData: GradingRequest = {
        taskId: task.id,
        input,
        validate: false,
        debugMode: false,
      };
      const gradingRequest = this.gradingService.gradeTask(gradingRequestData);
      gradingRequests.push(gradingRequest);
    });

    // Wait for all requests to complete
    this.subscriptions.push(
      forkJoin(...gradingRequests).subscribe(
        (gradings) => {
          this.gradings = gradings;
          this.gradingRequests = RequestState.SUCCESS;
        },
        () => {
          this.notify.error("Could not grade");
          this.gradingRequests = RequestState.ERROR;
        }
      )
    );
  }

  get isCorrect() {
    return this.gradings.every(
      (grading) => grading.correct === Correctness.CORRECT
    );
  }

  onNext() {
    this.next.emit();
  }

  onRetry() {
    this.retry.emit();
  }

  get markers(): Marker[] {
    const spellCheckParts: SpellCheckPart[] = this.spellCheckSteps
      .filter(
        (step) =>
          step.groups.length === 0 ||
          step.groups
            .map((s) => s.correctness === Correctness.WRONG)
            .reduce((prev, current) => prev && current)
      ) // check if author overruled spellcheck in LAP
      .map((step) => step.part as SpellCheckPart);
    return spellCheckParts.map((part) => ({
      length: part.length,
      offset: part.offset,
      styles: {
        background: "#F5606E",
      },
    }));
  }

  get takeAway(): string | null {
    const takeAways = [
      ...this.spellCheckHumanTakeAways,
      ...this.spellCheckMachineTakeAways,
      ...this.openTaskHumanTakeAways,
    ];
    return this.firstOrNull(takeAways);
  }

  firstOrNull(a: any[]) {
    if (a.length > 0) {
      return a[0];
    } else {
      return null;
    }
  }

  get spellCheckMachineTakeAways() {
    return this.spellCheckSteps.map(
      (step) =>
        `Rund um den Ausdruck "${
          (step.part as SpellCheckPart).affected
        }" scheint etwas nicht zu stimmen. Um den Satz auszuwerten, sind wir froh, wenn du diesen korrigieren oder umschreiben würdest.`
    );
  }

  get spellCheckHumanTakeAways() {
    return this.getTakeAwaysOfSteps(this.spellCheckSteps);
  }

  get openTaskHumanTakeAways() {
    return this.getTakeAwaysOfSteps(this.openTaskSteps);
  }

  getTakeAwaysOfSteps(steps: StepWithGroups[]) {
    return steps
      .filter((step) => step.groups.length > 0)
      .map((step) => step.groups)
      .reduce((acc, val) => acc.concat(val), [])
      .filter((step) => step.description != null)
      .map((step) => step!.description);
  }

  get spellCheckSteps() {
    return this.steps.filter(
      (step) => step.part.partType === StepFeatureType.SPELL_CHECK
    );
  }

  get openTaskSteps() {
    return this.steps.filter(
      (step) => step.part.partType === StepFeatureType.OPEN
    );
  }

  get steps() {
    const steps: StepWithGroups[] = [];
    this.gradings.forEach((grading) =>
      grading.steps.forEach((step) => steps.push(step))
    );
    return steps;
  }
}
