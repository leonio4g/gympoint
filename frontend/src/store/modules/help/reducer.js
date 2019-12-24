import produce from 'immer';

const INITIAL_STATE = {
  helpOrders: null,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/ANSWER_HELPORDER': {
        draft.helpOrders = action.payload.helpOrders;
        console.tron.log(action.payload.helpOrder);
        break;
      }

      default:
    }
  });
}
