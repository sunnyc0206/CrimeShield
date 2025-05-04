package com.sunny.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sunny.entity.Role;
import com.sunny.entity.User;
import com.sunny.exception.InvalidDataFormatException;
import com.sunny.exception.RecordFoundException;
import com.sunny.exception.RecordNotFoundException;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;
import com.sunny.repository.RoleRepository;
import com.sunny.repository.UserRepository;
import com.sunny.service.UserService;

@Service
public class UserServiceImpl implements UserService<User> {

    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private RoleRepository roleRepository;

    @Transactional
    @Override
    public Optional<UserOutputModel> findById(Integer userId) {
        try {
            Optional<User> optionalUser = userRepository.findById(userId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Integer uid = user.getId();
                String name = user.getName();
                String email = user.getEmail();
                String mobile = user.getMobile();

                UserOutputModel userOutput = new UserOutputModel(uid, name, mobile, email);
                return Optional.of(userOutput);
            } else {
                throw new RecordNotFoundException("Searching Failed !! User not found with ID: " + userId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e; 
        }
    }
 
    @Transactional
    @Override
    public String deleteById(Integer id) {
        JSONObject jsonObject = new JSONObject();
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isPresent()) {
                userRepository.deleteById(id);
                jsonObject.put("message", "User deleted successfully");
            } else {
                throw new RecordNotFoundException("Deletion Failed !! User not found with ID: " + id);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }


    @Transactional
    @Override
    public User addOperator(UserRegisterInputModel userRegisterInputModel) throws InvalidDataFormatException {
        String email = userRegisterInputModel.getEmail();
        String phone = userRegisterInputModel.getMobile();
        String password = userRegisterInputModel.getPassword();

        // Check if the email is already registered
        if (userRepository.findByEmail(email) != null) {
            throw new RecordFoundException("Email already in use");
        }

        if (userRepository.findByPhone(phone) != null) {
            throw new RecordFoundException("Phone already in use");
        }

        // Validate email format
        if (!email.matches("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b")) {
            throw new InvalidDataFormatException("Invalid email format");
        }

        // Validate phone number format and length
        if (!phone.matches("\\d{10}")) {
            throw new InvalidDataFormatException("Phone number must contain exactly 10 numeric digits");
        }
        
        // Validate password format and length
        if (password.length() < 5 || !password.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]|;:\"'<>,.?/~]).*$")) {
            throw new InvalidDataFormatException("Password must be at least 5 characters long and contain alphanumeric and special characters");
        }

        User user = new User();
        Role role ;
        if (email.endsWith("@crimeshield.com")) {
            role = roleRepository.findById(1).orElse(null); // Assigning role 1 for @crimeshield domain
        } else if (email.endsWith("@investigator.com")) {
            role = roleRepository.findById(2).orElse(null); // Assigning role 2 for @investigator domain
        } else {
            throw new InvalidDataFormatException("Invalid email domain");
        }
        
        if (role != null) {
            user.setRole(role);
        } else {
            throw new InvalidDataFormatException("Role not found");
        }
        user.setName(userRegisterInputModel.getName());
        user.setEmail(email);
        user.setMobile(phone);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);

        return userRepository.save(user);
    }
    
    @Transactional
	@Override
	public Collection<UserOutputModel> findAll() {
	    List<User> userList = userRepository.findAll();
	    if (userList.isEmpty()) {
	        throw new RecordNotFoundException("No users found");
	    }
	    List<UserOutputModel> userOutputList = new ArrayList<>();
	    for (User user : userList) {
	        Integer uid = user.getId();
	        String name = user.getName();
	        String email = user.getEmail();
	        String mobile = user.getMobile();

	        UserOutputModel userOutputModel = new UserOutputModel(uid, name, mobile, email);
	        userOutputList.add(userOutputModel);
	    }

	    return userOutputList;
	}



    
    
    

}