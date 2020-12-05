package com.upgrad.quora.api.exception;

import com.upgrad.quora.api.model.ErrorResponse;
import com.upgrad.quora.service.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

/**
 *  This class contains all the Exception Handlers for all the exceptions implemented in this project.
 *  This is a global code for exception handlers and all the controllers implemented in this project can use this code.
 */

@ControllerAdvice
public class RestExceptionHandler {

    /**
     * @param exc      - SignUpRestrictedException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(SignUpRestrictedException.class)
    public ResponseEntity<ErrorResponse> signUpRestrictedException(SignUpRestrictedException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }

    /**
     * @param exc      - AuthenticationFailedException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(AuthenticationFailedException.class)
    public ResponseEntity<ErrorResponse> authenticationFailedException(AuthenticationFailedException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }

    /**
     * @param exc      - SignOutRestrictedException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(SignOutRestrictedException.class)
    public ResponseEntity<ErrorResponse> signOutRestrictedException(SignOutRestrictedException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }

    /**
     * @param exc      - AuthorizationFailedException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(AuthorizationFailedException.class)
    public ResponseEntity<ErrorResponse> authorizationFailedException(AuthorizationFailedException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }

    /**
     * @param exc      - UserNotFoundException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundException(UserNotFoundException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }

    /**
     * @param exc      - InvalidQuestionException type object contains error code and error message.
     * @param request  - The web request object gives access to all the request parameters.
     * @return         - ResponseEntity<ErrorResponse> type object displays error code and error message along with HttpStatus CONFLICT
     */
    @ExceptionHandler(InvalidQuestionException.class)
    public ResponseEntity<ErrorResponse> invalidQuestionException(InvalidQuestionException exc, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse().code(exc.getCode()).message(exc.getErrorMessage()), HttpStatus.CONFLICT
        );
    }
}
