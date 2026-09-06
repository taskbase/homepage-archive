/**
 * Created by Bersling on 17/08/16.
 */

type TaskTypeEnum = 'course' | 'block' | 'sheet' | 'onlineunit' | 'theoryunit' | 'open' | 'mc' | 'truefalse' | 'theory'
    | 'videounit' | 'flashcardunit' | 'flashcard' | 'video' | 'gap' | 'solutionfield';

class TaskType {

  //Course
  static get course():string {
    return "course"
  }

  //Objectives
  static get block():string {
    return "block"
  }

  static get sheet():string {
    return "sheet"
  }

  static get theoryunit():string {
    return "theoryunit"
  }

  static get onlineunit():string {
    return "onlineunit"
  }

  //Autoobjective
  static get autoobjective():string {
    return "autoobjective"
  }

  static get mc():string {
    return "mc"
  }

  static get theory():string {
    return "theory"
  }

  static get video():string {
    return "video"
  }

  static get link():string {
    return "link"
  }

  static get open():string {
    return "open"
  }

  static get lorem():string {
    return "lorem"
  }

  //step
  static get step():string {
    return "step"
  }

  static get objectiveTypes():string[] {
    return [TaskType.block, TaskType.sheet, TaskType.theoryunit, TaskType.onlineunit];
  }

}


type ContentTypeEnum = 'latex' | 'mathjax' | 'wysiwyg';

class TaskMenus {
  static get play():string {
    return "play"
  }

  static get edit():string {
    return "edit"
  }

  static get view():string {
    return "view"
  }
}

type NewTaskTypeEnum = 'loremipsum' | 'theory' | 'open' | 'flashcard' | 'video';

class PatchOperation {
  static get add():string {
    return "add"
  }

  static get remove():string {
    return "remove"
  }

  static get replace():string {
    return "replace"
  }

  static get copy():string {
    return "copy"
  }

  static get move():string {
    return "move"
  }

  static get test():string {
    return "test"
  }
}

class SearchResourceType {
  static get competences():string {
    return "objectives"
  }

  static get tasks():string {
    return "tasks"
  }
}


class TaskSearchSettingsTypes {
  static get competence():string {
    return "competence"
  }

  static get task():string {
    return "task"
  }

  static get bold():string {
    return "bold"
  }
}


class TaskSearchStyle {
  static get bold():string {
    return "bold"
  }

  static get default():string {
    return "default"
  }
}

type StateNameEnum = 'landing' | 'task-search' | 'competence-search';

class StateName {

  static get task():string {
    return "task"
  }

  static get landing():string {
    return "landing"
  }

  static get taskSearch():string {
    return "task-search"
  }

  static get competenceSearch():string {
    return "competence-search"
  }

  static get recommender():string {
    return "recommender"
  }

  static get taskkView():string {
    return "taskk"
  }
}

enum TaskMenuEnum {
  edit, add, view
}

type ActionTypeEnum = 'ATTEMPT' | 'HINT_REQUEST' | 'SKIP' | 'VIEW' | 'SELF_ASSESSMENT' | 'DIFFICULTY' | 'USEFULNESS' |
    'TIME_SPENT' | 'FILE_SUBMISSION' | 'TEXT_SUBMISSION' | 'TAG' | 'UNTAG' | 'VISIT_COURSE' | 'PAGE_VIEW' | 'NOTE' | 'UNKNOWN'
    | 'VIEW_FLASHCARD_SOLUTION';

type EvaluationTypeEnum = 'CORRECT' | 'INCORRECT' | 'NONE';

type RoleEnum = 'STUDENT' | 'COURSE_OWNER' | 'TEACHING_ASSISTANT' | 'COURSE_RESOURCE_USER' | 'TASK_READER';

type TaskCategory = 'step' | 'exercise' | 'theory' | 'task' | 'objective' | 'block' | 'course' | 'flashcard' | 'unspecified';

type TaskProperty = 'children' | 'start' | 'end' | 'video' | 'links' | 'mcAnswers' | 'solution' |
    'files' | 'title' | 'type' | 'description' | 'mcType' | 'solutionFinal';

type CoursePermissionsEnum = 'UPDATE_COURSE' | 'CREATE_COURSE';
type ActivityEnum = 'ON_DASHBOARD' | 'IN_SEARCH' | 'IN_LIBRARY';

enum Subject {
  MATHEMATICS,PHYSICS,BIOLOGY,CHEMISTRY,
  GEOGRAPHY,HISTORY,ECONOMICS_AND_LAW,COMPUTER_SCIENCE,
  GERMAN,ENGLISH,FRENCH,ITALIAN,SPANISH,
      //,LATIN,GREEK,RUSSIAN,
  ART,MUSIC,SPORTS,POLITICS_PHILOSOPHY_PAEDAGOGICS,RELIGION,OTHER
}

enum CourseLevel {
  ONE_TWO,THREE_FOUR,FIVE_SIX, SEVEN_EIGHT,NINE_TEN,ELEVEN_TWELVE,THIRTEEN_FOURTEEN,
  UNIVERSITY,TRADE_SCHOOL
}

enum BroadcastEvents {
  GOOGLE_CHART_READY, UPDATED_STATISTICS
}

enum EmitEvents {
  MODAL_CLOSE
}
