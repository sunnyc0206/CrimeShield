package com.sunny.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOutputModel {


		private Integer id;
	    private String name;
	    private String mobile;
	    private String email;
	    
}
