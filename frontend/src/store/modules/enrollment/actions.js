export function enrollmentUpdateRequest(data) {
  return {
    type: '@enrollment/ENROLLMENT_UPDATE_REQUEST',
    payload: { data },
  };
}
export function enrollmentData(data) {
  return {
    type: '@enrollment/ENROLLMENT_DATA',
    payload: { data },
  };
}
export function enrollmentUpdateSuccess(enrollment) {
  return {
    type: '@enrollment/ENROLLMENT_UPDATE_SUCCESS',
    payload: { enrollment },
  };
}

export function enrollmentFailure() {
  return {
    type: '@enrollment/ENROLLMENT_FAILURE',
  };
}
