package com.upgrad.quora.service.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "ANSWER")
@NamedQueries({
        @NamedQuery(name = "answerByUuid", query = "select a from AnswerEntity a where a.uuid = :uuid"),
        @NamedQuery(name = "getAllAnswersByQuestion", query = "select a from AnswerEntity a where a.question = :question")
})

public class AnswerEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 200)
    @NotNull
    private String uuid;

    @Size(max = 500)
    @NotNull
    private String content;

    @NotNull
    private ZonedDateTime date;

    @JoinColumn(name = "question_id")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private QuestionEntity question;

    @JoinColumn(name = "user_id")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private UserEntity user;

    public AnswerEntity() { }

    public AnswerEntity(@Size(max = 500) @NotNull String content, @NotNull ZonedDateTime date, @NotNull QuestionEntity question, @NotNull UserEntity user) {
        this.content = content;
        this.date = date;
        this.question = question;
        this.user = user;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getUuid() { return uuid; }

    public void setUuid(String uuid) { this.uuid = uuid; }

    public String getAns() { return this.content; }

    public void setAns(String content) { this.content = content; }

    public ZonedDateTime getDate() { return date; }

    public void setDate(ZonedDateTime date) { this.date = date; }

    public QuestionEntity getQuestion() { return question; }

    public void setQuestion(QuestionEntity question) { this.question = question; }

    public UserEntity getUser() { return user; }

    public void setUser(UserEntity user) { this.user = user; }

    @Override
    public int hashCode() { return new HashCodeBuilder().append(this).hashCode(); }

    @Override
    public boolean equals(Object obj) { return new EqualsBuilder().append(this, obj).isEquals(); }

    @Override
    public String toString() { return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE); }
}

