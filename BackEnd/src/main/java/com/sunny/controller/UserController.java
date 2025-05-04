package com.sunny.controller;
import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.entity.User;
import com.sunny.model.CriminalOutputModel;
import com.sunny.model.UserInputModel;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;
import com.sunny.repository.UserRepository;
import com.sunny.resource.UserResource;
import com.sunny.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController implements UserResource<User> {

	private static Logger log = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService<User> userService; 
	
	@Autowired
	private UserRepository userRepository;


	@Override
	public ResponseEntity<String> addOperator(@RequestBody UserRegisterInputModel userRegisterInputModel) {
	     log.info("UserController : register");
	     JSONObject jsonObject = new JSONObject();
	     try {
	         User user = userService.addOperator(userRegisterInputModel);
	         jsonObject.put("User:", user.getName() + " saved successfully");
	         return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
	     } 
	     catch (JSONException e) {
	         try {
	             jsonObject.put("exception", e.getMessage());
	         } catch (JSONException e1) {
	             e1.printStackTrace();
	         }
	         return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
	     }
	}
	
	@Override
	public ResponseEntity<String> authenticate(@RequestBody UserInputModel user) throws JSONException {
	    log.info("UserResourceImpl : authenticate");
	    JSONObject jsonObject = new JSONObject();

	    boolean isAuthenticated = authenticateUser(user.getEmail(), user.getPassword());
	    if (isAuthenticated) {
	        String email = user.getEmail();
	        jsonObject.put("Success", "Authentication successful");
	        return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
	    } else {
	        jsonObject.put("Error", "Invalid credentials");
	        return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
	    }
	}

	
	private boolean authenticateUser(String email, String password) {
	    User user = userRepository.findByEmail(email);
	    if (user != null) {
	        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        if (passwordEncoder.matches(password, user.getPassword())) {
	            return true;
	        } 
	    }
	    return false;
	}
	@Override
	public ResponseEntity<String> deleteById(Integer id) {
	return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
	}
	
    @Override
    public Optional<UserOutputModel> findById(Integer id) {
        return userService.findById(id);
    }
    
	@Override
	public Collection<UserOutputModel> findAll() {
		// TODO Auto-generated method stub
		return userService.findAll();
	}


	


}