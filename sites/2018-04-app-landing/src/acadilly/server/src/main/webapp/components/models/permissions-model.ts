interface CoursePermissions {

  UPDATE_COURSE: boolean;
  CREATE_MESSAGE: boolean;
}

interface AppPermissions {

  CREATE_COURSE: boolean;
  TEACHER_VIEW: boolean;
  ADMINISTRATION?: boolean;

}

type CoursePermissionsEnum =  'UPDATE_COURSE' | 'CREATE_MESSAGE';

type AppPermissionsEnum = 'TEACHER_VIEW' | 'CREATE_COURSE' | 'ADMINISTRATION';