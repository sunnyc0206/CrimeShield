package com.sunny.test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sunny.controller.CourtController;
import com.sunny.entity.Court;
import com.sunny.service.CourtService;

class CourtControllerTest {

    @Mock
    private CourtService<Court> courtService;

    @InjectMocks
    private CourtController courtController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findByLocation() {
        String location = "Court Location";
        Court court = new Court();
        when(courtService.findByLocation(location)).thenReturn(Optional.of(court));

        Optional<Court> result = courtController.findByLocation(location);

        assertTrue(result.isPresent());
        assertEquals(court, result.get());
        verify(courtService, times(1)).findByLocation(location);
    }

    @Test
    void findById() {
        Integer id = 1;
        Court court = new Court();
        when(courtService.findById(id)).thenReturn(Optional.of(court));

        Optional<Court> result = courtController.findById(id);

        assertTrue(result.isPresent());
        assertEquals(court, result.get());
        verify(courtService, times(1)).findById(id);
    }

    @Test
    void save() {
        Court court = new Court();
        Court savedCourt = new Court();
        when(courtService.save(court)).thenReturn(savedCourt);

        ResponseEntity<Court> response = courtController.save(court);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedCourt, response.getBody());
        verify(courtService, times(1)).save(court);
    }

    @Test
    void testSave() {
        Court court = new Court();
        Court savedCourt = new Court();

        when(courtService.save(court)).thenReturn(savedCourt);

        ResponseEntity<Court> response = courtController.save(court);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedCourt, response.getBody());
        verify(courtService).save(court);
    }
    @Test
    void testUpdate() {
        int courtId = 1;
        Court court = new Court();
        Court updatedCourt = new Court();

        when(courtService.update(courtId, court)).thenReturn(updatedCourt);

        ResponseEntity<Court> response = courtController.update(courtId, court);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedCourt, response.getBody());
        verify(courtService).update(courtId, court);
    }


    @Test
    void deleteById() {
        Integer id = 1;
        String deleteResult = "Deleted";
        when(courtService.deleteById(id)).thenReturn(deleteResult);

        ResponseEntity<String> response = courtController.deleteById(id);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(deleteResult, response.getBody());
        verify(courtService, times(1)).deleteById(id);
    }

    @Test
    void findAll() {
        Collection<Court> courts = Arrays.asList(new Court(), new Court());
        when(courtService.findAll()).thenReturn(courts);

        Collection<Court> result = courtController.findAll();

        assertNotNull(result);
        assertEquals(courts.size(), result.size());
        assertEquals(courts, result);
        verify(courtService, times(1)).findAll();
    }
}
