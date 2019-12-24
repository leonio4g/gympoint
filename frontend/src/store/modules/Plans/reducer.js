import produce from 'immer';

const INITIAL_STATE = {
  plans: null,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/PLAN_DATA': {
        draft.plans = action.payload.data;
        break;
      }
      case '@plan/PLAN_UPDATE_SUCCESS': {
        draft.plans = action.payload.plans;
        break;
      }
      case '@plan/PLAN_DELETE': {
        draft.plans = action.payload.plans;
        break;
      }
      case '@plan/PLAN_FAILURE': {
        break;
      }
      default:
    }
  });
}
