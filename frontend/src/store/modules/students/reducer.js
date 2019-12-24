import produce from 'immer';

const INITIAL_STATE = {
  students: null,
};

export default function students(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/STUDENT_DATA': {
        draft.students = action.payload.data;
        break;
      }
      case '@student/STUDENT_UPDATE_SUCCESS': {
        draft.students = action.payload.student;
        break;
      }
      case '@student/STUDENT_DELETE': {
        draft.students = action.payload.students;
        break;
      }
      case '@student/STUDENT_FAILURE': {
        break;
      }
      default:
    }
  });
}
