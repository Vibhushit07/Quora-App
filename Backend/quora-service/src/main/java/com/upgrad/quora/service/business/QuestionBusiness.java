package com.upgrad.quora.service.business;

import com.upgrad.quora.service.dao.QuestionDao;
import com.upgrad.quora.service.dao.UserDao;
import com.upgrad.quora.service.entity.QuestionEntity;
import com.upgrad.quora.service.entity.UserAuthEntity;
import com.upgrad.quora.service.entity.UserEntity;
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
public class QuestionBusiness {
    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private UserDao userDao;

    @Transactional(propagation = Propagation.REQUIRED)
    public QuestionEntity createQuestion(final QuestionEntity questionEntity, final String authToken) throws AuthorizationFailedException {
        UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(authToken);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if(userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out.Sign in first to post a question");
            } else {
                UserEntity userEntity = userAuthEntity.getUser();

                questionEntity.setDate(ZonedDateTime.now());
                questionEntity.setUuid(UUID.randomUUID().toString());
                questionEntity.setUser(userEntity);

                return questionDao.addQuestion(questionEntity);
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<QuestionEntity> getAllQuestion(final String authToken) throws AuthorizationFailedException {
        UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(authToken);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else {
            if(userAuthEntity.getLogoutAt() != null) {
                throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to get all questions");
            } else {
                return questionDao.allQuestions();
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public QuestionEntity editAQuestion(final String authToken, final String quesId, final QuestionEntity questionEntity) throws AuthorizationFailedException, InvalidQuestionException {
        UserAuthEntity userAuthEntity = userDao.getUserAuthByAccessToken(authToken);

        if(userAuthEntity == null) {
            throw new AuthorizationFailedException("ATHR-001", "User has not signed in");
        } else if(userAuthEntity.getLogoutAt() != null) {
            throw new AuthorizationFailedException("ATHR-002", "User is signed out. Sign in first to get all questions");
        } else {
            QuestionEntity questionEntity1 = questionDao.getQuestionByUuid(quesId);

            if(questionEntity1 == null) {
                throw new InvalidQuestionException("QUES-001", "Entered question uuid does not exist");
            } else if(questionEntity1.getUser() != userAuthEntity.getUser()) {
                throw new AuthorizationFailedException("ATHR-003", "Only the question owner can edit the question");
            } else {
                questionEntity.setUser(questionEntity1.getUser());
                questionEntity.setDate(questionEntity1.getDate());
                questionEntity.setUuid(questionEntity1.getUuid());
                questionEntity.setId(questionEntity1.getId());

                return questionDao.editQuestion(questionEntity);
            }
        }
    }
}
