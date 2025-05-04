package com.sunny.service.impl;

import java.util.Collection;
import java.util.Optional;

import javax.transaction.Transactional;

import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunny.entity.Court;
import com.sunny.exception.RecordNotFoundException;
import com.sunny.repository.CourtRepository;
import com.sunny.service.CourtService;

@Service
public class CourtServiceImpl implements CourtService<Court> { 

	@Autowired
	private CourtRepository courtRepository;

	@Transactional
	@Override
	public Collection<Court> findAll() {
	    return courtRepository.findAll();
	}

	@Transactional
	@Override
	public Optional<Court> findById(Integer id) {
		Optional<Court> court = courtRepository.findById(id);
		if (court.isEmpty()) {
			throw new RecordNotFoundException("Court not found for ID: " + id);
		}
		return court;
	}

	@Transactional
	@Override
	public Optional<Court> findByLocation(String loc) {
		Optional<Court> court = courtRepository.findByLocation(loc);
		
		return court;
	}

//	@Transactional
//	@Override
//	public Court update(Integer courtID,Court court) {
//		return courtRepository.save(court);
//	}
	@Transactional
	@Override
	public Court update(Integer courtId, Court updatedCourt) {
	    Optional<Court> optionalExistingCourt = courtRepository.findById(courtId);
	    if (optionalExistingCourt.isPresent()) {
	        Court existingCourt = optionalExistingCourt.get();

	        existingCourt.setJudgeName(updatedCourt.getJudgeName());
	        existingCourt.setCourtLocation(updatedCourt.getCourtLocation());
	        existingCourt.setCourtType(updatedCourt.getCourtType());

	        return courtRepository.save(existingCourt);
	    } else {
	        throw new RecordNotFoundException("Update failed!! Court not found for ID: " + courtId);
	    }
	}

	@Override
	@Transactional
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
			Optional<Court> court = courtRepository.findById(id);
			if (court.isPresent()) {
				courtRepository.deleteById(id);
				} 
			return jsonObject.toString();
		}

	@Override
	public Court save(Court court) {
		return courtRepository.save(court);
	}
	}
