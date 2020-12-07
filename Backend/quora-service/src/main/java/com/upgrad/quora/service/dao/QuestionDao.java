package com.upgrad.quora.service.dao;

import com.upgrad.quora.service.entity.QuestionEntity;
import com.upgrad.quora.service.entity.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class QuestionDao {
    @PersistenceContext
    private EntityManager entityManager;

    public QuestionEntity addQuestion(final QuestionEntity questionEntity) {
        entityManager.persist(questionEntity);
        return questionEntity;
    }

    public List<QuestionEntity> allQuestions() {
        try{
            return entityManager.createNamedQuery("getAllQuestions", QuestionEntity.class).getResultList();
        }catch (NoResultException nre) {
            return null;
        }
    }

    public QuestionEntity getQuestionByUuid(final String uuid) {
        try{
            return entityManager.createNamedQuery("questionsByUuid", QuestionEntity.class).setParameter("uuid", uuid).getSingleResult();
        }catch (NoResultException nre) {
            return null;
        }
    }

    public QuestionEntity editQuestion(final QuestionEntity questionEntity) {
        entityManager.merge(questionEntity);
        return questionEntity;
    }

    @Transactional
    public QuestionEntity deleteQuestion(final QuestionEntity questionEntity) {
        entityManager.remove(questionEntity);
        return questionEntity;
    }

    public List<QuestionEntity> allQuestionsByUser(final UserEntity user) {
        try{
            return entityManager.createNamedQuery("questionsByUser", QuestionEntity.class).setParameter("user", user).getResultList();
        }catch (NoResultException nre) {
            return null;
        }
    }
}
