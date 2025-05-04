package com.sunny.controller;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.entity.Court;
import com.sunny.resource.CourtResource;
import com.sunny.service.CourtService;

@RestController
@RequestMapping("/courts") 
@CrossOrigin(origins="http://localhost:3000")
public class CourtController implements CourtResource<Court> {
	

	@Autowired
	private CourtService<Court>loc;
	

	@Override
	public Optional<Court> findByLocation(String location) {
		return loc.findByLocation(location);
	}

	@Override
	public Optional<Court> findById(Integer id) {
		return loc.findById(id);
	}

	@Override
	public ResponseEntity<Court> save(Court court) {
		return new ResponseEntity<>(loc.save(court), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Court> update(int courtId,Court court) {
		return new ResponseEntity<>(loc.update(courtId, court), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Integer id) {
		return new ResponseEntity<>(loc.deleteById(id), HttpStatus.OK);
	}
	@Override
	public Collection<Court> findAll() {
		return loc.findAll();
	}
 

}
