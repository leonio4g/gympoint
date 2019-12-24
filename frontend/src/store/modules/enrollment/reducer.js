import produce from 'immer';

const INITIAL_STATE = {
  enrollments: null,
};

export default function enrollments(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/ENROLLMENT_DATA': {
        draft.enrollments = action.payload.data;
        break;
      }
      case '@enrollment/ENROLLMENT_UPDATE_SUCCESS': {
        draft.enrollments = action.payload.enrollments;
        break;
      }
      case '@enrollment/ENROLLMENT_DELETE': {
        draft.enrollments = action.payload.enrollments;
        break;
      }
      case '@enrollment/ENROLLMENT_FAILURE': {
        break;
      }
      default:
    }
  });
}
