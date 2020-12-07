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
@Table(name = "QUESTION")
@NamedQueries({
        @NamedQuery(name = "getAllQuestions", query = "select q from QuestionEntity q"),
        @NamedQuery(name = "questionsByUuid", query = "select q from QuestionEntity q where q.uuid = :uuid"),
        @NamedQuery(name = "questionsById", query = "select q from QuestionEntity q where q.id = :id"),
        @NamedQuery(name = "questionsByUser", query = "select q from QuestionEntity q where q.user = :user"),
})
public class QuestionEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 200)
    @NotNull
    private String uuid;

    @Size(max = 150)
    @NotNull
    private String title;

    @Size(max = 500)
    @NotNull
    private String content;

    @NotNull
    private ZonedDateTime date;

    @JoinColumn(name = "USER_ID")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private UserEntity user;

    public QuestionEntity() { }

    public QuestionEntity(@Size(max = 150) @NotNull String title, @Size(max = 500) @NotNull String content, @NotNull ZonedDateTime date, @NotNull UserEntity user) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.user = user;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getUuid() { return uuid; }

    public void setUuid(String uuid) { this.uuid = uuid; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public ZonedDateTime getDate() { return date; }

    public void setDate(ZonedDateTime date) { this.date = date; }

    public UserEntity getUser() { return user; }

    public void setUser(UserEntity user) { this.user = user; }

    @Override
    public int hashCode() { return new HashCodeBuilder().append(this).hashCode(); }

    @Override
    public boolean equals(Object obj) { return new EqualsBuilder().append(this, obj).isEquals(); }

    @Override
    public String toString() { return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE); }
}
