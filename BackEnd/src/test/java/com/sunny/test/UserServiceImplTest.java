package com.sunny.test;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sunny.entity.Role;
import com.sunny.entity.User;
import com.sunny.exception.InvalidDataFormatException;
import com.sunny.exception.RecordFoundException;
import com.sunny.model.UserOutputModel;
import com.sunny.model.UserRegisterInputModel;
import com.sunny.repository.RoleRepository;
import com.sunny.repository.UserRepository;
import com.sunny.service.impl.UserServiceImpl;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    
    @Test
    void testAddOperator_ValidInput_OperatorAddedSuccessfully() {
        String email = "operator@crimeshield.com";
        String phone = "1234567890";
        String password = "P@ssw0rd";
        UserRegisterInputModel inputModel = new UserRegisterInputModel();
        inputModel.setEmail(email);
        inputModel.setMobile(phone);
        inputModel.setPassword(password);
        inputModel.setName("Operator Name");

        User existingUserWithEmail = new User();
        existingUserWithEmail.setEmail(email);

        User existingUserWithPhone = new User();
        existingUserWithPhone.setMobile(phone);

        when(userRepository.findByEmail(email)).thenReturn(null);
        when(userRepository.findByPhone(phone)).thenReturn(null);
        when(roleRepository.findById(1)).thenReturn(Optional.of(new Role()));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.addOperator(inputModel);

        assertNotNull(result);
        assertEquals(email, result.getEmail());
        assertEquals(phone, result.getMobile());
        verify(userRepository, times(1)).save(any(User.class));
    }
    
    @Test
    void testFindById() {
        Integer userId = 1;
        User user = new User();
        user.setId(userId);
        user.setName("John");
        user.setEmail("john@example.com");
        user.setMobile("1234567890");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<UserOutputModel> result = userService.findById(userId);

        assertTrue(result.isPresent());
        assertEquals(userId, result.get().getId());
        assertEquals("John", result.get().getName());
        assertEquals("john@example.com", result.get().getEmail());
        assertEquals("1234567890", result.get().getMobile());

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testAddOperator_EmailAlreadyExists_RecordFoundException() {
        String email = "operator@crimeshield.com";
        UserRegisterInputModel inputModel = new UserRegisterInputModel();
        inputModel.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(new User());

        assertThrows(RecordFoundException.class, () -> userService.addOperator(inputModel));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testAddOperator_PhoneAlreadyExists_RecordFoundException() {
        String phone = "1234567890";
        UserRegisterInputModel inputModel = new UserRegisterInputModel();
        inputModel.setMobile(phone);

        when(userRepository.findByPhone(phone)).thenReturn(new User());

        assertThrows(RecordFoundException.class, () -> userService.addOperator(inputModel));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testAddOperator_InvalidEmailFormat_InvalidDataFormatException() {
        String email = "invalid_email";
        UserRegisterInputModel inputModel = new UserRegisterInputModel();
        inputModel.setEmail(email);

        assertThrows(InvalidDataFormatException.class, () -> userService.addOperator(inputModel));
        verify(userRepository, never()).save(any(User.class));
    }


    @Test
    void testDeleteById() {
        Integer userId = 1;

        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));

        String result = userService.deleteById(userId);

        assertNotNull(result);
        assertTrue(result.contains("User deleted successfully"));

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).deleteById(userId);
    }



    @Test
    void testAddOperator() {
        UserRegisterInputModel inputModel = new UserRegisterInputModel();
        inputModel.setName("John");
        inputModel.setEmail("john@example.com");
        inputModel.setMobile("1234567890");
        inputModel.setPassword("Password1");
       

        Role role = new Role();
        role.setId(1);

        when(userRepository.findByEmail(inputModel.getEmail())).thenReturn(null);
        when(userRepository.findByPhone(inputModel.getMobile())).thenReturn(null);
    }


}
