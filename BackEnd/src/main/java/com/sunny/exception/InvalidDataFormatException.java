
package com.sunny.exception;

public class InvalidDataFormatException extends RuntimeException {
	    
	    private static final long serialVersionUID = 1L;
	    
	    public InvalidDataFormatException(String message) {
	        super(message);
	    }
	    
	    public InvalidDataFormatException(String message, Throwable cause) {
	        super(message, cause);
	    }
	    
	    public InvalidDataFormatException(Throwable cause) {
	        super(cause);
	    }
	}



