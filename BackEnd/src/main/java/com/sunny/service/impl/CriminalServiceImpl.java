package com.sunny.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.transaction.Transactional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunny.entity.Criminal;
import com.sunny.exception.InvalidDataFormatException;
import com.sunny.exception.RecordFoundException;
import com.sunny.exception.RecordNotFoundException;
import com.sunny.model.CriminalOutputModel;
import com.sunny.repository.CriminalRepository;
import com.sunny.service.CriminalService;

@Service
public class CriminalServiceImpl implements CriminalService<Criminal> {

	@Autowired
	private CriminalRepository criminalRepository; 

	
	private CriminalOutputModel convertToCriminalOutputModel(Criminal criminal) {
	    return new CriminalOutputModel(
	            criminal.getCriminalName(),
		        criminal.getCriminalEthnicity(),
		        criminal.getCriminalDOB().toString(),
		        criminal.getCriminalHeight(),
		        criminal.getCriminalLocation(),
		        criminal.getAadharNumber(),
		        criminal.getCriminalGender(), 
		        criminal.getCID()
		    );
	}
	 
	@Transactional
	@Override
	public Optional<CriminalOutputModel> findById(Integer id) {
	    Optional<Criminal> optionalCriminal = criminalRepository.findById(id);
	    if (optionalCriminal.isEmpty()) {
	        throw new RecordNotFoundException("Criminal not found for ID: " + id);
	    }

	    Criminal criminal = optionalCriminal.get();
	    CriminalOutputModel outputModel = new CriminalOutputModel(
	        criminal.getCriminalName(),
	        criminal.getCriminalEthnicity(),
	        criminal.getCriminalDOB().toString(),
	        criminal.getCriminalHeight(),
	        criminal.getCriminalLocation(),
	        criminal.getAadharNumber(),
	        criminal.getCriminalGender(), 
	        criminal.getCID()
	    );

	    return Optional.of(outputModel);
	}

	@Transactional
	@Override
	public Criminal registerCriminal(Criminal criminal) {
	    String aadharNumber = criminal.getAadharNumber();
	    
	    if (aadharNumber.length() != 12 ) {
	        throw new InvalidDataFormatException("Aadhar number should be exactly 12 digits.");
	    }
	    // Check if a criminal with the same Aadhar number exists
	    Optional<Criminal> optionalCriminal = criminalRepository.findByAadharNumber(aadharNumber);
	    if (optionalCriminal.isPresent()) {
	        throw new RecordFoundException("Criminal already exists in the database.");
	    }
	    
	    return criminalRepository.save(criminal);
	}
	
	@Transactional
	@Override
	public Criminal updateCriminal(Integer criminalId, Criminal criminal) {
	    Optional<Criminal> optionalExistingCriminal = criminalRepository.findById(criminalId);
	    if (optionalExistingCriminal.isPresent()) {
	        Criminal existingCriminal = optionalExistingCriminal.get();
	        
	        String newAadharNumber = criminal.getAadharNumber();
	        
	        // Check if the new Aadhar number conflicts with an existing criminal record
	        Optional<Criminal> optionalCriminalWithNewAadhar = criminalRepository.findByAadharNumber(newAadharNumber);
	        if (optionalCriminalWithNewAadhar.isPresent() && !existingCriminal.equals(optionalCriminalWithNewAadhar.get())) {
	            throw new EntityExistsException("Aadhar number already exists for another criminal record.");
	        }
	        
	        existingCriminal.setCriminalName(criminal.getCriminalName());
	        existingCriminal.setCriminalEthnicity(criminal.getCriminalEthnicity());
	        existingCriminal.setCriminalDOB(criminal.getCriminalDOB());
	        existingCriminal.setCriminalHeight(criminal.getCriminalHeight());
	        existingCriminal.setCriminalGender(criminal.getCriminalGender());
	        existingCriminal.setCriminalLocation(criminal.getCriminalLocation());
	        existingCriminal.setAadharNumber(newAadharNumber);
	        
	        return criminalRepository.save(existingCriminal);
	    } else {
	        throw new RecordNotFoundException("Update failed!! Criminal not found for ID: " + criminalId);
	    }
	}
	
	@Transactional
	@Override
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
		try {
			Optional<Criminal> optionalCriminal = criminalRepository.findById(id);
			if (optionalCriminal.isPresent()) {
				criminalRepository.deleteById(id);
				jsonObject.put("message", "Criminal deleted successfully!");
			} else {
				throw new RecordNotFoundException("Criminal not found for ID: " + id);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
	 
	@Transactional
	@Override
	public Collection<CriminalOutputModel> findAll() {
		List<Criminal> criminalList = criminalRepository.findAll();
		if (criminalList.isEmpty()) {
			throw new RecordNotFoundException("No criminals found");
		}
		List<CriminalOutputModel> criminalOutputList = new ArrayList<>();
				for (Criminal c : criminalList) {
		            CriminalOutputModel criminalOutputModel = convertToCriminalOutputModel(c);
		            criminalOutputList.add(criminalOutputModel);
		        }

		        return criminalOutputList;
	}
	
	@Transactional
	@Override
    public Collection<CriminalOutputModel> findByLocation(String loc) {
        List<Criminal> criminalList = criminalRepository.findByLocation(loc);
        if (criminalList.isEmpty()) {
	        throw new RecordNotFoundException("FIR not found for location: " + loc);
	    }
        List<CriminalOutputModel> criminalOutputList = new ArrayList<>();

        for (Criminal c : criminalList) {
            CriminalOutputModel criminalOutputModel = convertToCriminalOutputModel(c);
            criminalOutputList.add(criminalOutputModel);
        }

        return criminalOutputList;
    }
}
