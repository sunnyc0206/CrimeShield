package com.sunny.exception;

public class RecordNotFoundException extends RuntimeException {

   
	private static final long serialVersionUID = 1L;

	public RecordNotFoundException(String message) {
        super(message);
    }

    public RecordNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
