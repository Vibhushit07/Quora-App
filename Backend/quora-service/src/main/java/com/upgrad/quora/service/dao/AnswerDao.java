package com.upgrad.quora.service.dao;

import com.upgrad.quora.service.entity.AnswerEntity;
import com.upgrad.quora.service.entity.QuestionEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class AnswerDao {
    @PersistenceContext
    private EntityManager entityManager;

    public AnswerEntity addAnswer(final AnswerEntity answerEntity) {
        entityManager.persist(answerEntity);
        return  answerEntity;
    }

    public AnswerEntity editAnswer(final AnswerEntity answerEntity) {
        entityManager.merge(answerEntity);
        return answerEntity;
    }

    public AnswerEntity getAnswerByUuid(final String uuid) {
        try{
            return entityManager.createNamedQuery("answerByUuid", AnswerEntity.class).setParameter("uuid", uuid).getSingleResult();
        }catch (NoResultException nre) {
            return null;
        }
    }

    public AnswerEntity deleteAnswer(final AnswerEntity answerEntity) {
        entityManager.remove(answerEntity);
        return answerEntity;
    }

    public List<AnswerEntity> allAnswersByQuestion(final QuestionEntity questionEntity) {
        try {
            return entityManager.createNamedQuery("getAllAnswersByQuestion", AnswerEntity.class).setParameter("question", questionEntity).getResultList();
        } catch (NoResultException nre) {
            return null;
        }
    }
}
