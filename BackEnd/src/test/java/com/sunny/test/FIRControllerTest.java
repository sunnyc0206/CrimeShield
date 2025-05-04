package com.sunny.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sunny.controller.FIRController;
import com.sunny.entity.FIR;
import com.sunny.model.FirInputModel;
import com.sunny.model.FirOutputModel;
import com.sunny.model.FirStatusUpdateInputModel;
import com.sunny.service.FirService;

class FIRControllerTest {

    @Mock
    private FirService<FIR> firService;

    @InjectMocks
    private FIRController firController;

    @BeforeEach
    void setup() { 
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterFIR() {
        FirInputModel inputModel = new FirInputModel();
        FIR expectedFIR = new FIR();
        when(firService.registerFIR(inputModel)).thenReturn(expectedFIR);

        ResponseEntity<FIR> result = firController.registerFIR(inputModel);

        assertEquals(expectedFIR, result.getBody());
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        verify(firService, times(1)).registerFIR(inputModel);
    }

    @Test
    void testUpdateCaseStatus() {
        int id = 1;
        FirStatusUpdateInputModel firStatusUpdateInputModel = new FirStatusUpdateInputModel();
        FIR updatedFIR = new FIR();

        when(firService.updateCaseStatus(id, firStatusUpdateInputModel)).thenReturn(updatedFIR);

        ResponseEntity<FIR> response = firController.updateCaseStatus(id, firStatusUpdateInputModel);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(updatedFIR, response.getBody());
        verify(firService).updateCaseStatus(id, firStatusUpdateInputModel);
    }


    @Test
    void testDeleteById() {
        Integer id = 1;
        String expectedMessage = "FIR deleted successfully";
        when(firService.deleteById(id)).thenReturn(expectedMessage);

        ResponseEntity<String> result = firController.deleteById(id);

        assertEquals(expectedMessage, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(firService, times(1)).deleteById(id);
    }

    @Test
    void testFindAll() {
        Collection<FirOutputModel> expectedList = List.of(new FirOutputModel(), new FirOutputModel());
        when(firService.findAll()).thenReturn(expectedList);

        Collection<FirOutputModel> result = firController.findAll();

        assertEquals(expectedList, result);
        verify(firService, times(1)).findAll();
    }

    @Test
    void testFindByLocation() {
        String location = "Delhi";
        Collection<FirOutputModel> expectedList = List.of(new FirOutputModel(), new FirOutputModel());
        when(firService.findByLocation(location)).thenReturn(expectedList);

        Collection<FirOutputModel> result = firController.findByLocation(location);

        assertEquals(expectedList, result);
        verify(firService, times(1)).findByLocation(location);
    }

    @Test
    void testFindById() {
        Integer id = 1;
        Optional<FirOutputModel> expectedOptional = Optional.of(new FirOutputModel());
        when(firService.findById(id)).thenReturn(expectedOptional);

        Optional<FirOutputModel> result = firController.findById(id);

        assertEquals(expectedOptional, result);
        verify(firService, times(1)).findById(id);
    }
}
