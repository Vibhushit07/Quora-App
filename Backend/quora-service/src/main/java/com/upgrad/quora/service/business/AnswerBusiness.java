package com.upgrad.quora.service.business;

import com.upgrad.quora.service.dao.AnswerDao;
import com.upgrad.quora.service.dao.QuestionDao;
import com.upgrad.quora.service.dao.UserDao;
import com.upgrad.quora.service.entity.AnswerEntity;
import com.upgrad.quora.service.entity.QuestionEntity;
import com.upgrad.quora.service.entity.UserAuthEntity;
import com.upgrad.quora.service.entity.UserEntity;
import com.upgrad.quora.service.exception.AnswerNotFoundException;
import com.upgrad.quora.service.exception.AuthorizationFailedException;
import com.upgrad.quora.service.exception.InvalidQuestionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AnswerBusiness {

    @Autowired
    private AnswerDao answerDao;

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private UserDao userDao;

    @Transactional(propagation = Propagation.REQUIRED)
    public AnswerEntity createAnswer(final AnswerEntity answerEntity, final String auth, final String questionId) throws AuthorizationFailedException, InvalidQuestionException {
        final UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(auth);

        if (userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if (userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to post a question");
            } else {
                final QuestionEntity questionEntity = questionDao.getQuestionByUuid(questionId);

                if (questionEntity == null) {
                    throw new InvalidQuestionException("QUES-001", "The question entered is invalid");
                } else {
                    UserEntity userEntity = userAuthEntity.getUser();
                    answerEntity.setDate(ZonedDateTime.now());
                    answerEntity.setUuid(UUID.randomUUID().toString());
                    answerEntity.setUser(userEntity);
                    answerEntity.setQuestion(questionEntity);
                    return answerDao.addAnswer(answerEntity);
                }
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public AnswerEntity editAAnswer(final AnswerEntity answerEntity, final String auth, final String answerId) throws AuthorizationFailedException, AnswerNotFoundException {
        final UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(auth);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if(userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to post a question");
            } else {
                final AnswerEntity answerEntity1 = answerDao.getAnswerByUuid(answerId);

                if(answerEntity1 == null) {
                    throw new AnswerNotFoundException("ANS-001", "Entered answer uuid does not exist");
                } else if(answerEntity1.getUser() != userAuthEntity.getUser()) {
                    throw new AuthorizationFailedException("ATHR-003", "Only the answer owner can edit the answer");
                } else {
                    answerEntity.setUuid(answerEntity1.getUuid());
                    answerEntity.setId(answerEntity1.getId());
                    answerEntity.setDate(answerEntity1.getDate());
                    answerEntity.setUser(answerEntity1.getUser());
                    answerEntity.setQuestion(answerEntity1.getQuestion());

                    return answerDao.editAnswer(answerEntity);
                }
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public AnswerEntity deleteAAnswer(final String auth, final String answerId)  throws AuthorizationFailedException, AnswerNotFoundException {
        final UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(auth);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if(userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to post a question");
            } else {
                final AnswerEntity answerEntity = answerDao.getAnswerByUuid(answerId);

                if(answerEntity == null) {
                    throw new AnswerNotFoundException("ANS-001", "Entered answer uuid does not exist");
                } else if(answerEntity.getUser() != userAuthEntity.getUser()) {
                    throw new AuthorizationFailedException("ATHR-003", "Only the answer owner can delete the answer");
                } else {
                    return answerDao.deleteAnswer(answerEntity);
                }
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<AnswerEntity> getAllAnswersByQuestionId(final String auth, final String questionId) throws AuthorizationFailedException, InvalidQuestionException {
        final UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(auth);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if(userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to post a question");
            } else {
                final QuestionEntity questionEntity = questionDao.getQuestionByUuid(questionId);

                if(questionEntity == null) {
                    throw new InvalidQuestionException("QUES-001", "The question with entered uuid whose details are to be seen does not exist");
                } else {
                    return answerDao.allAnswersByQuestion(questionEntity);
                }
            }
        }
    }
}