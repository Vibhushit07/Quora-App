package com.upgrad.quora.api.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * QuestionDetailsResponse
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-12-09T02:12:01.514+05:30")

public class QuestionDetailsResponse   {
  @JsonProperty("id")
  private String id = null;

  @JsonProperty("title")
  private String title = null;

  @JsonProperty("content")
  private String content = null;

  public QuestionDetailsResponse id(String id) {
    this.id = id;
    return this;
  }

  /**
   * question uuid
   * @return id
  **/
  @ApiModelProperty(required = true, value = "question uuid")
  @NotNull


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public QuestionDetailsResponse title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Question content
   * @return title
  **/
  @ApiModelProperty(required = true, value = "Question content")
  @NotNull


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public QuestionDetailsResponse content(String content) {
    this.content = content;
    return this;
  }

  /**
   * Question content
   * @return content
  **/
  @ApiModelProperty(required = true, value = "Question content")
  @NotNull


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    QuestionDetailsResponse questionDetailsResponse = (QuestionDetailsResponse) o;
    return Objects.equals(this.id, questionDetailsResponse.id) &&
        Objects.equals(this.title, questionDetailsResponse.title) &&
        Objects.equals(this.content, questionDetailsResponse.content);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, title, content);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class QuestionDetailsResponse {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    content: ").append(toIndentedString(content)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

