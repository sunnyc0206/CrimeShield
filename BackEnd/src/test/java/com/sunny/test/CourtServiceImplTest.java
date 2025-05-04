package com.sunny.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

import com.sunny.entity.Court;
import com.sunny.exception.RecordNotFoundException;
import com.sunny.repository.CourtRepository;
import com.sunny.service.impl.CourtServiceImpl;

class CourtServiceImplTest {

    @Mock 
    private CourtRepository courtRepository;

    @InjectMocks
    private CourtServiceImpl courtService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        
        Court court1 = createSampleCourt(1);
        Court court2 = createSampleCourt(2);
        when(courtRepository.findAll()).thenReturn(Arrays.asList(court1, court2));

        Collection<Court> result = courtService.findAll();

        assertEquals(2, result.size());
        assertTrue(result.contains(court1));
        assertTrue(result.contains(court2));

        verify(courtRepository, times(1)).findAll();
    }


    @Test
    void testFindById() {
        Integer courtId = 1;
        Court court = createSampleCourt(courtId);
        when(courtRepository.findById(courtId)).thenReturn(Optional.of(court));

        Optional<Court> result = courtService.findById(courtId);

        assertTrue(result.isPresent());
        assertEquals(court, result.get());

        verify(courtRepository, times(1)).findById(courtId);
    }

    @Test
    void testFindById_CourtNotFound() {
        Integer courtId = 1;
        when(courtRepository.findById(courtId)).thenReturn(Optional.empty());

        assertThrows(RecordNotFoundException.class, () -> {
            courtService.findById(courtId);
        });

        verify(courtRepository, times(1)).findById(courtId);
    }

    @Test
    void testFindByLocation() {
        String location = "Sample Location";
        Court court = createSampleCourt(1);
        when(courtRepository.findByLocation(location)).thenReturn(Optional.of(court));

        Optional<Court> result = courtService.findByLocation(location);

        assertTrue(result.isPresent());
        assertEquals(court, result.get());

        verify(courtRepository, times(1)).findByLocation(location);
    }


    @Test
    void testSaveOrUpdate() {
        Court court = createSampleCourt(1);
        when(courtRepository.save(court)).thenReturn(court);

        Court result = courtService.save(court);

        assertEquals(court, result);

        verify(courtRepository, times(1)).save(court);
    }



    private Court createSampleCourt(Integer courtId) {
        Court court = new Court();
        court.setCourtId(courtId);
        return court;
    }
}
