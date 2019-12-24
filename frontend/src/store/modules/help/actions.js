export function HelpOrderAnswer(answer, id) {
  return {
    type: '@helpOrder/ANSWER_HELPORDER',
    payload: { answer, id },
  };
}
