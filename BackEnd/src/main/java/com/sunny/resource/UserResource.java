package com.sunny.resource;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.sunny.model.UserInputModel;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;

public interface UserResource<T>  {
	

	@PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> authenticate(@RequestBody UserInputModel user) throws JSONException;
	
	@GetMapping("/{id}")
	public Optional<UserOutputModel> findById(@PathVariable Integer id);
	
	@PostMapping("/addOperator")
	public ResponseEntity<String> addOperator(@RequestBody UserRegisterInputModel userRegisterInputModel);
	
	@GetMapping
	public Collection<UserOutputModel> findAll();
	
	@DeleteMapping("{id}")
	ResponseEntity<String> deleteById(@PathVariable Integer id);




}
