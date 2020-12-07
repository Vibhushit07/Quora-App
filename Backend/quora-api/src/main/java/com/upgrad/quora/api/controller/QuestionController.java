package com.upgrad.quora.api.controller;

import com.upgrad.quora.api.model.QuestionDetailsResponse;
import com.upgrad.quora.api.model.QuestionRequest;
import com.upgrad.quora.api.model.QuestionResponse;
import com.upgrad.quora.service.business.QuestionBusiness;
import com.upgrad.quora.service.entity.QuestionEntity;
import com.upgrad.quora.service.exception.AuthorizationFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class QuestionController {
    @Autowired
    private QuestionBusiness questionBusiness;

    @RequestMapping(method = RequestMethod.POST, path = "/question/create", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private ResponseEntity<QuestionResponse> postQuestion(@RequestBody final QuestionRequest questionRequest, @RequestHeader("authorization") final String authorization) throws AuthorizationFailedException {
        final QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setTitle(questionRequest.getTitle());
        questionEntity.setContent(questionRequest.getContent());
        final QuestionEntity createdQuestionEntity = questionBusiness.createQuestion(questionEntity, authorization.split("Bearer ")[1]);
        QuestionResponse questionResponse = new QuestionResponse().id(createdQuestionEntity.getUuid()).status("QUESTION CREATED");
        return new ResponseEntity<>(questionResponse, HttpStatus.CREATED);
    }

    @GetMapping("/question/all")
    private ResponseEntity<List<QuestionDetailsResponse>> getAllQuestions(@RequestHeader("authorization") final String authorization) throws AuthorizationFailedException {
        List<QuestionEntity> list = questionBusiness.getAllQuestion(authorization.split("Bearer ")[1]);

        List<QuestionDetailsResponse> questions = list.stream()
                .map(question -> {
                    QuestionDetailsResponse q = new QuestionDetailsResponse();
                    q.setContent(question.getContent());
                    q.setTitle(question.getTitle());
                    q.setId(question.getUuid());
                    return q;
                }).collect(Collectors.toList());

        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
}
