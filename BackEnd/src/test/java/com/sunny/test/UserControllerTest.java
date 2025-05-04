package com.sunny.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sunny.controller.UserController;
import com.sunny.entity.User;
import com.sunny.model.UserInputModel;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;
import com.sunny.repository.UserRepository;
import com.sunny.service.UserService;

class UserControllerTest {

    @Mock
    private UserService<User> userService;
    

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddOperator() {
        UserRegisterInputModel userRegisterInputModel = new UserRegisterInputModel();
        User expectedUser = new User();
        expectedUser.setName("John Doe");

        when(userService.addOperator(userRegisterInputModel)).thenReturn(expectedUser);

        ResponseEntity<String> response = userController.addOperator(userRegisterInputModel);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains(expectedUser.getName()));
        verify(userService).addOperator(userRegisterInputModel);
    }

    
    @Test
    void testAddOperator_SuccessfulRegistration() {
        UserRegisterInputModel registerInputModel = new UserRegisterInputModel();
        registerInputModel.setName("John Doe");
        registerInputModel.setEmail("john@example.com");
        registerInputModel.setPassword("password");

        User registeredUser = new User();
        registeredUser.setName("John Doe");
        registeredUser.setEmail("john@example.com");
        registeredUser.setPassword("password");

        when(userService.addOperator(registerInputModel)).thenReturn(registeredUser);

        ResponseEntity<String> response = userController.addOperator(registerInputModel);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }


    @Test
    void testAuthenticate_SuccessfulAuthentication() throws JSONException {
        UserInputModel userInputModel = new UserInputModel();
        userInputModel.setEmail("john@example.com");
        userInputModel.setPassword("password");

        User user = new User();
        user.setEmail("john@example.com");
        user.setPassword(new BCryptPasswordEncoder().encode("password"));

        when(userRepository.findByEmail(userInputModel.getEmail())).thenReturn(user);

        ResponseEntity<String> response = userController.authenticate(userInputModel);

        assertEquals(HttpStatus.OK, response.getStatusCode());
       
    }
    
    

    @Test
    void testAuthenticate_InvalidCredentials() throws JSONException {
        UserInputModel userInputModel = new UserInputModel();
        userInputModel.setEmail("john@example.com");
        userInputModel.setPassword("password");

        when(userRepository.findByEmail(userInputModel.getEmail())).thenReturn(null);

        ResponseEntity<String> response = userController.authenticate(userInputModel);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    
    }


    @Test
    void testFindById() {
        int userId = 1;
        Optional<UserOutputModel> expectedOutputModel = Optional.of(new UserOutputModel());
        expectedOutputModel.get().setId(userId);
        expectedOutputModel.get().setName("John Doe");

        when(userService.findById(userId)).thenReturn(expectedOutputModel);

        Optional<UserOutputModel> result = userController.findById(userId);

        assertEquals(expectedOutputModel, result);

        verify(userService, times(1)).findById(userId);
    }

    @Test
    void testDeleteById() {
        int userId = 1;
        String expectedResult = "User with ID 1 deleted.";

        when(userService.deleteById(userId)).thenReturn(expectedResult);

        ResponseEntity<String> response = userController.deleteById(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResult, response.getBody());

        verify(userService, times(1)).deleteById(userId);
    }}
