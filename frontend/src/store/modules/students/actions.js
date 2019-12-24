export function studentUpdateRequest(data) {
  return {
    type: '@student/STUDENT_UPDATE_REQUEST',
    payload: { data },
  };
}
export function studentData(data) {
  return {
    type: '@student/STUDENT_DATA',
    payload: { data },
  };
}
export function studentUpdateSuccess(student) {
  return {
    type: '@student/STUDENT_UPDATE_SUCCESS',
    payload: { student },
  };
}
export function studentFailure() {
  return {
    type: '@student/STUDENT_FAILURE',
  };
}
