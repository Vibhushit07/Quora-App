import { getQuestionId } from "./answers";

var questions = [];
var userQuestions = [];

export const getQuestions = () => questions;

export const setQuestions = (question) => questions = question;

export const getUserQuestion = () => userQuestions;

export const setUserQuestion = (question) => userQuestions = question;

export const getQuestionById = () => questions.filter(question => question.id === getQuestionId());