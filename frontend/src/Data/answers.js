const question = {
    questionId: '',
    answers: []
}

export const getQuestionId = () => question.questionId;

export const setQuestionId = qId => question.questionId = qId;

export const setAnswers = answers => question.answers = answers

export const getAnswers = () => question.answers;

export const getAnswerById = (answerId) => question.answers.filter(answer => answer.id === answerId); 