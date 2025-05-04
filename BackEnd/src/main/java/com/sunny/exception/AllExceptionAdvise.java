package com.sunny.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.sunny.model.ErrorResponseModel;

@RestControllerAdvice
public class AllExceptionAdvise {
    private static final Logger logger = LoggerFactory.getLogger(AllExceptionAdvise.class);

    @ExceptionHandler(InvalidDataFormatException.class)
    public ResponseEntity<ErrorResponseModel> handleInvalidDataFormatException(InvalidDataFormatException e, WebRequest wr) {
        logger.error("Invalid data format exception occurred: {}", e.getMessage(), e);
        
        ErrorResponseModel errorResponseModel = new ErrorResponseModel();
        errorResponseModel.setErrorCode(400);
        errorResponseModel.setErrorMessage(e.getMessage());
        
        return new ResponseEntity<>(errorResponseModel, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<ErrorResponseModel> handleRecordNotFoundException(RecordNotFoundException e, WebRequest wr) {
        logger.error("Record not found exception occurred: {}", e.getMessage(), e);
        
        ErrorResponseModel errorResponseModel = new ErrorResponseModel();
        errorResponseModel.setErrorCode(404);
        errorResponseModel.setErrorMessage(e.getMessage());
        
        return new ResponseEntity<>(errorResponseModel, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(RecordFoundException.class)
    public ResponseEntity<ErrorResponseModel> handleRecordFoundException(RecordFoundException e, WebRequest wr) {
        logger.error("Data match exception occurred: {}", e.getMessage(), e);
        
        ErrorResponseModel errorResponseModel = new ErrorResponseModel();
        errorResponseModel.setErrorCode(409);
        errorResponseModel.setErrorMessage(e.getMessage());
        
        return new ResponseEntity<>(errorResponseModel, HttpStatus.CONFLICT);
    }
}
