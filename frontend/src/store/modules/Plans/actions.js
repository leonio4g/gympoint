export function planUpdateRequest(data) {
  return {
    type: '@plan/PLAN_UPDATE_REQUEST',
    payload: { data },
  };
}
export function planData(data) {
  return {
    type: '@plan/PLAN_DATA',
    payload: { data },
  };
}
export function planUpdateSuccess(plan) {
  return {
    type: '@plan/PLAN_UPDATE_SUCCESS',
    payload: { plan },
  };
}

export function planFailure() {
  return {
    type: '@plan/PLAN_FAILURE',
  };
}
