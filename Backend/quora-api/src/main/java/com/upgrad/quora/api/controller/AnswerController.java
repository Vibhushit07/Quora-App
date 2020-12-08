package com.upgrad.quora.api.controller;

import com.upgrad.quora.api.model.*;
import com.upgrad.quora.service.business.AnswerBusiness;
import com.upgrad.quora.service.entity.AnswerEntity;
import com.upgrad.quora.service.exception.AnswerNotFoundException;
import com.upgrad.quora.service.exception.AuthorizationFailedException;
import com.upgrad.quora.service.exception.InvalidQuestionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class AnswerController {
    @Autowired
    private AnswerBusiness answerBusiness;

    @PostMapping(value = "/question/{questionId}/answer/create", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private ResponseEntity<AnswerResponse> postAnswer(@RequestHeader("authorization") final String authorization, @PathVariable("questionId") final String questionId, @RequestBody final AnswerRequest answerRequest) throws AuthorizationFailedException, InvalidQuestionException {
        final AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setAns(answerRequest.getContent());

        final AnswerEntity createdAnswerEntity = answerBusiness.createAnswer(answerEntity, authorization.split("Bearer ")[1], questionId);
        final AnswerResponse answerResponse = new AnswerResponse().id(createdAnswerEntity.getUuid()).status("ANSWER CREATED");
        return new ResponseEntity<>(answerResponse, HttpStatus.CREATED);
    }

    @PutMapping(value = "/answer/edit/{answerId}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private ResponseEntity<AnswerEditResponse> editAnswerContent(@RequestHeader("authorization") final String authorization, @PathVariable("answerId") final String answerId, @RequestBody final AnswerEditRequest answerEditRequest) throws AuthorizationFailedException, AnswerNotFoundException {
        final AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setAns(answerEditRequest.getContent());

        final AnswerEntity createdAnswerEntity = answerBusiness.editAAnswer(answerEntity, authorization.split("Bearer ")[1], answerId);
        final AnswerEditResponse answerEditResponse = new AnswerEditResponse().id(createdAnswerEntity.getUuid()).status("ANSWER EDITED");
        return new ResponseEntity<>(answerEditResponse, HttpStatus.OK);
    }

    @DeleteMapping(value = "/answer/delete/{answerId}")
    private ResponseEntity<AnswerDeleteResponse> deleteAnswerById(@RequestHeader("authorization") final String authorization, @PathVariable("answerId") final String answerId) throws AuthorizationFailedException, AnswerNotFoundException {

        final AnswerEntity answerEntity = answerBusiness.deleteAAnswer(authorization.split("Bearer ")[1], answerId);
        final AnswerDeleteResponse answerDeleteResponse = new AnswerDeleteResponse().id(answerEntity.getUuid()).status("ANSWER EDITED");
        return new ResponseEntity<>(answerDeleteResponse, HttpStatus.OK);
    }

    @GetMapping("answer/all/{questionId}")
    private ResponseEntity<List<AnswerDetailsResponse>> getAllAnswersOfQuestion(@RequestHeader("authorization") final String authorization, @PathVariable("questionId") final String questionId) throws AuthorizationFailedException, InvalidQuestionException {

        List<AnswerEntity> list = answerBusiness.getAllAnswersByQuestionId(authorization.split("Bearer ")[1], questionId);

        List<AnswerDetailsResponse> answers = list.stream()
                .map(answerEntity -> {
                    AnswerDetailsResponse answerDetailsResponse = new AnswerDetailsResponse();
                    answerDetailsResponse.setAnswerContent(answerEntity.getAns());
                    answerDetailsResponse.setQuestionContent(answerEntity.getQuestion().getContent());
                    answerDetailsResponse.setId(answerEntity.getUuid());
                    return answerDetailsResponse;
                }).collect(Collectors.toList());

        return new ResponseEntity<>(answers, HttpStatus.OK);
    }
}