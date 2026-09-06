interface Permissions {
  //main
  CREATE_COURSE: boolean;
  UPDATE_COURSE: boolean;

  //single time get
  ADMINISTRATION?: boolean;
  SET_COPYRIGHTED?: boolean;
}

type PermissionsEnum =

  // course
  'CREATE_COURSE' | 'UPDATE_COURSE' |

      //single time get
      'ADMINISTRATION' | 'SET_COPYRIGHTED'