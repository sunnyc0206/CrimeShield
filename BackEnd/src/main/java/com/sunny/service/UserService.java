package com.sunny.service;

import java.util.Collection;
import java.util.Optional;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;


public interface UserService<T> {
//	Collection<T> findAll(String searchText);
	String deleteById(Integer id);
//	T saveOrUpdate(T t);
	Collection<UserOutputModel> findAll();
	T addOperator(UserRegisterInputModel userRegisterInputModel);
	Optional<UserOutputModel> findById(Integer userId);




}
