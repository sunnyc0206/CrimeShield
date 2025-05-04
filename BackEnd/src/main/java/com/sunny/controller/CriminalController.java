package com.sunny.controller;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.entity.Criminal;
import com.sunny.model.CriminalOutputModel;
import com.sunny.resource.CriminalResource;
import com.sunny.service.CriminalService;

@RestController
@RequestMapping("/criminals")
@CrossOrigin(origins="http://localhost:3000")
public class CriminalController implements CriminalResource<Criminal> {
	
	@Autowired
	public CriminalService<Criminal> criminalService;

	@Override
	public Optional<CriminalOutputModel> findById(Integer id) {
		return criminalService.findById(id);
	}
	
	@Override
	public Collection<CriminalOutputModel> findAll() {
		// TODO Auto-generated method stub
		return criminalService.findAll();
	}
	
	@Override
	public Collection<CriminalOutputModel> findByLocation(String location) {
		return criminalService.findByLocation(location);
	}
	 

//	@Override
//	public ResponseEntity<Criminal> update(Criminal criminal) {
//		 int criminalId = criminal.getCID();
//	     Criminal updatedCriminal = criminalService.updateCriminal(criminalId,criminal);
//	     return ResponseEntity.ok(updatedCriminal);
//	     
//	}
	public ResponseEntity<Criminal> update(@PathVariable int criminalId, @RequestBody Criminal criminal) {
	    // Use the criminalId parameter to identify the specific criminal record to update
	    // Update the corresponding criminal record in your data source
	    Criminal updatedCriminal = criminalService.updateCriminal(criminalId, criminal);

	    if (updatedCriminal != null) {
	        return ResponseEntity.ok(updatedCriminal);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	    
	@Override
	public ResponseEntity<String> deleteById(Integer id) {
		return new ResponseEntity<>(criminalService.deleteById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Criminal> registerCriminal(Criminal criminal) {
		return new ResponseEntity<>(criminalService.registerCriminal(criminal), HttpStatus.CREATED);
	}


	

	




  
}
