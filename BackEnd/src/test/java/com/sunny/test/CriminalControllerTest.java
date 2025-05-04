package com.sunny.test;

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

import com.sunny.controller.CriminalController;
import com.sunny.entity.Criminal;
import com.sunny.model.CriminalOutputModel;
import com.sunny.service.CriminalService;

class CriminalControllerTest {

    @Mock
    private CriminalService<Criminal> criminalService;

    @InjectMocks
    private CriminalController criminalController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterCriminal() {
        Criminal inputModel = new Criminal();
        Criminal expectedCriminal = new Criminal();
        when(criminalService.registerCriminal(inputModel)).thenReturn(expectedCriminal);

        ResponseEntity<Criminal> result = criminalController.registerCriminal(inputModel);

        assertEquals(expectedCriminal, result.getBody());
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        verify(criminalService, times(1)).registerCriminal(inputModel);
    }
    
    @Test
    void testFindByLocation() {
        String location = "Delhi";
        Collection<CriminalOutputModel> expectedList = List.of(new CriminalOutputModel(), new CriminalOutputModel());
        when(criminalService.findByLocation(location)).thenReturn(expectedList);

        Collection<CriminalOutputModel> result = criminalController.findByLocation(location);

        assertEquals(expectedList, result);
        verify(criminalService, times(1)).findByLocation(location);
    }

    @Test
    void testUpdate_SuccessfulUpdate() {
        Criminal criminal = new Criminal();
        criminal.setCID(1);
        // Set other properties of the criminal object

        Criminal updatedCriminal = new Criminal();
        updatedCriminal.setCID(1);
        // Set other properties of the updated criminal object

        when(criminalService.updateCriminal(1, criminal)).thenReturn(updatedCriminal);

        ResponseEntity<Criminal> response = criminalController.update(1, criminal);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedCriminal, response.getBody());
    }

    @Test
    void testDeleteById() {
        Integer id = 1;
        String expectedMessage = "Criminal deleted successfully";
        when(criminalService.deleteById(id)).thenReturn(expectedMessage);

        ResponseEntity<String> result = criminalController.deleteById(id);

        assertEquals(expectedMessage, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(criminalService, times(1)).deleteById(id);
    }

    @Test
    void testFindAll() {
        Collection<CriminalOutputModel> expectedList = List.of(new CriminalOutputModel(), new CriminalOutputModel());
        when(criminalService.findAll()).thenReturn(expectedList);

        Collection<CriminalOutputModel> result = criminalController.findAll();

        assertEquals(expectedList, result);
        verify(criminalService, times(1)).findAll();
    }

    @Test
    void testFindById() {
        Integer id = 1;
        Optional<CriminalOutputModel> expectedOptional = Optional.of(new CriminalOutputModel());
        when(criminalService.findById(id)).thenReturn(expectedOptional);

        Optional<CriminalOutputModel> result = criminalController.findById(id);

        assertEquals(expectedOptional, result);
        verify(criminalService, times(1)).findById(id);
    }
    
}