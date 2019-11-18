export function storeRequest(student) {
  return {
    type: '@student/STORE_REQUEST',
    payload: { student },
  };
}

export function updateRequest(student) {
  return {
    type: '@student/UPDATE_REQUEST',
    payload: { student },
  };
}

export function studentSuccess(token, user) {
  return {
    type: '@student/STUDENT_SUCCESS',
    payload: { token, user },
  };
}

export function studentFailure() {
  return {
    type: '@student/STUDENT_FAILURE',
  };
}
