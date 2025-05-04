package com.sunny.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterInputModel {

	private String name;
	private String email;
	private String mobile;
	private String password;
//	private Integer roleId	;

	
}
