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

import com.sunny.entity.Criminal;
import com.sunny.model.CriminalOutputModel;

public interface CriminalResource<T> {
	
	@GetMapping
	public Collection<CriminalOutputModel> findAll();

	@GetMapping("/id/{id}")
	public Optional<CriminalOutputModel> findById(@PathVariable Integer id);
	
	@GetMapping("/location/{location}")
	public Collection<CriminalOutputModel> findByLocation(@PathVariable String location);
	
	@PostMapping("/registerCriminal")
	ResponseEntity<T> registerCriminal(@RequestBody Criminal criminal);
	
//	@PutMapping("/updateCriminal")
//	ResponseEntity<T> update(@RequestBody Criminal criminal);
	
	@PutMapping("/updateCriminal/{criminalId}")
	public ResponseEntity<T> update(@PathVariable int criminalId, @RequestBody Criminal criminal);
	
	@DeleteMapping("{id}")
	ResponseEntity<String> deleteById(@PathVariable Integer id);
	
	





}
