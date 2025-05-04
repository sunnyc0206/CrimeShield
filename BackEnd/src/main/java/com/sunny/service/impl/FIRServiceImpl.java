package com.sunny.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunny.entity.Court;
import com.sunny.entity.Criminal;
import com.sunny.entity.FIR;
import com.sunny.exception.InvalidDataFormatException;
import com.sunny.exception.RecordNotFoundException;
import com.sunny.model.FirInputModel;
import com.sunny.model.FirOutputModel;
import com.sunny.model.FirStatusUpdateInputModel;
import com.sunny.repository.CourtRepository;
import com.sunny.repository.CriminalRepository;
import com.sunny.repository.FIRRepository;
import com.sunny.service.FirService;
import com.sunny.utils.CrimeStatus;

@Service
public class FIRServiceImpl implements FirService<FIR> {

	@Autowired
	private FIRRepository firRepository;
	
	@Autowired
	private CourtRepository courtRepository;
	
	@Autowired 
	private CriminalRepository criminalRepository;
	
	
	
	
	 //This is ConvertToFIR outputmodel which i can use for searching by id/location/findall or etc...
	
        private FirOutputModel convertToFirOutputModel(FIR fir) {
        FirOutputModel firOutputModel = new FirOutputModel();
        firOutputModel.setFId(fir.getFID());

        Criminal criminal = fir.getCriminal();
        if (criminal != null) {
            firOutputModel.setCriminalName(criminal.getCriminalName());
            firOutputModel.setCId(criminal.getCID());
            firOutputModel.setCriminalDob(criminal.getCriminalDOB().toString());
            firOutputModel.setCriminalLocation(criminal.getCriminalLocation());
        }

        Court court = fir.getCourt();
        if (court != null) {
            firOutputModel.setCourtLocation(court.getCourtLocation());
        }

        firOutputModel.setCrimeType(fir.getCrimeType());
        firOutputModel.setCrimeWeapon(fir.getCrimeWeapon());
        firOutputModel.setFirRegisterDate(fir.getFirRegisterDate().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")));
        firOutputModel.setCrimeStatus(fir.getCrimeStatus());
        firOutputModel.setCrimeLocation(fir.getCrimeLocation());
        firOutputModel.setVictimName(fir.getVictimName());
        firOutputModel.setVictimPhone(fir.getVictimPhone());
        firOutputModel.setVictimAddress(fir.getVictimAddress());

        return firOutputModel;
    }
	
        
    @Transactional
	@Override
	public Optional<FirOutputModel> findById(Integer id) {
	    Optional<FIR> firOptional = firRepository.findById(id);
	    if (firOptional.isEmpty()) {
	        throw new RecordNotFoundException("FIR not found for id: " + id);
	    }

	    FIR fir = firOptional.get();
	    FirOutputModel firOutputModel = convertToFirOutputModel(fir);
	    return Optional.of(firOutputModel);
	}

    @Transactional
	@Override
	public FIR updateCaseStatus(Integer id,FirStatusUpdateInputModel firStatusUpdateInputModel) {
	    Optional<FIR> optionalFir = firRepository.findById(firStatusUpdateInputModel.getFid());
	    if (optionalFir.isPresent()) {
	        FIR fir = optionalFir.get();
	        String newStatusString = firStatusUpdateInputModel.getCrimeStatus().toString(); // Assuming it returns a valid CrimeStatus string
	        CrimeStatus newStatus = CrimeStatus.valueOf(newStatusString);
	     
	        // Check if the case status is changed
	        if (fir.getCrimeStatus() != newStatus) {
	            // Update court's activeCases and solvedCases count based on the previous and new status
	            Court court = fir.getCourt();
	            if (court != null) {
	                if (fir.getCrimeStatus() == CrimeStatus.CaseClosed) {
	                    court.setSolvedCases(court.getSolvedCases() - 1);
	                    court.setActiveCases(court.getActiveCases() + 1);
	                } else if (newStatus == CrimeStatus.CaseClosed) {
	                    court.setSolvedCases(court.getSolvedCases() + 1);
	                    court.setActiveCases(court.getActiveCases() - 1);
	                }
	                courtRepository.save(court);
	            }
	        }

	        fir.setCrimeStatus(newStatus);

	        return firRepository.save(fir);
	    }

	    throw new RecordNotFoundException("FIR not found with ID: " + firStatusUpdateInputModel.getFid());
	}



    @Transactional
	@Override
	public String deleteById(Integer id) {
		JSONObject jsonObject = new JSONObject();
		try {
			Optional<FIR> optionalFir = firRepository.findById(id);
			if (optionalFir.isPresent()) {
				firRepository.deleteById(id);
				jsonObject.put("message", "FIR deleted successfully!");
			} else {
				throw new RecordNotFoundException("FIR not found for ID: " + id);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

    @Transactional
	@Override
	public Collection<FirOutputModel> findAll() {
		List<FIR> firList = firRepository.findAll();
        if (firList.isEmpty()) {
	        throw new RecordNotFoundException("FIR not found ");
	    }
        List<FirOutputModel> firOutputList = new ArrayList<>();

        for (FIR fir : firList) {
            FirOutputModel firOutputModel = convertToFirOutputModel(fir);
            firOutputList.add(firOutputModel);
        }
 
        return firOutputList;
    }
	

    @Transactional
	@Override
	    public Collection<FirOutputModel> findByLocation(String loc) {
	        List<FIR> firList = firRepository.findByLocation(loc);
	        if (firList.isEmpty()) {
		        throw new RecordNotFoundException("FIR not found for location: " + loc);
		    }
	        List<FirOutputModel> firOutputList = new ArrayList<>();

	        for (FIR fir : firList) {
	            FirOutputModel firOutputModel = convertToFirOutputModel(fir);
	            firOutputList.add(firOutputModel);
	        }

	        return firOutputList;
	    }

	  

    @Transactional
	@Override
	public FIR registerFIR(FirInputModel firInputModel) {
		FIR fir = new FIR();
		String phone = firInputModel.getVictimPhone();
		Court court = courtRepository.findById(firInputModel.getCourtId()).orElse(null);
		Criminal criminal = criminalRepository.findById(firInputModel.getCriminalId()).orElse(null);
		if (court == null || criminal == null) {
			throw new RecordNotFoundException("Court or Criminal not found");
		}
		if (!phone.matches("\\d{10}")) {
            throw new InvalidDataFormatException("Phone number must contain exactly 10 numeric digits");
        }
		else
		{ 
			fir.setCriminal(criminal);
			fir.setCourt(court);
			fir.setCrimeLocation(firInputModel.getCrimeLocation());
			fir.setCrimeWeapon(firInputModel.getCrimeWeapon());
			fir.setCrimeType(firInputModel.getCrimeType());
			fir.setFirRegisterDate(LocalDateTime.now());
			fir.setCrimeStatus(CrimeStatus.CasePending);
			fir.setVictimName(firInputModel.getVictimName());
			fir.setVictimPhone(firInputModel.getVictimPhone());
			fir.setVictimAddress(firInputModel.getVictimAddress());
		}
		firRepository.save(fir);
		court.setActiveCases(court.getActiveCases() + 1);
		courtRepository.save(court);
		return fir;
	}
}
