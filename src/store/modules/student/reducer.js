import produce from 'immer';

const INITIAL_STATE = {
  student: {},
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case '@student/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
