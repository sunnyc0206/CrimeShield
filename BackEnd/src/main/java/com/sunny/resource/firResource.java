package com.sunny.resource;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.sunny.entity.FIR;
import com.sunny.model.FirInputModel;
import com.sunny.model.FirOutputModel;
import com.sunny.model.FirStatusUpdateInputModel;

public interface firResource<T>  {
	
	FirInputModel firInputModel = new FirInputModel();

	
	@GetMapping()
	public Collection<FirOutputModel> findAll();

	@GetMapping("/id/{id}")
	public Optional<FirOutputModel> findById(@PathVariable Integer id);
	
	@GetMapping("/location/{location}")
	public Collection<FirOutputModel> findByLocation(@PathVariable String location);
	
	@PostMapping("/registerFIR")
    public ResponseEntity<FIR> registerFIR(@RequestBody FirInputModel firInputModel);
	
	
	@DeleteMapping("{id}")
	ResponseEntity<String> deleteById(@PathVariable Integer id);

	@PutMapping("/updateCaseStatus/{id}")
	ResponseEntity<FIR> updateCaseStatus(@PathVariable Integer id,@RequestBody FirStatusUpdateInputModel firstatusUpdateInputModel);
	


	


	








}
