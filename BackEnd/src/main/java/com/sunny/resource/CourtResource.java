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



public interface CourtResource<T> {
	
	@GetMapping
	public Collection<T> findAll();

	@GetMapping("/id/{id}")
	public Optional<T> findById(@PathVariable("id") Integer id);
	
	@GetMapping("/location/{location}")
	public Optional<T> findByLocation(@PathVariable("location") String location);
	
	@PostMapping("/addCourt")
	ResponseEntity<T> save(@RequestBody T t);
	
	@PutMapping("/updateCourt/{courtId}")
	ResponseEntity<T> update(@PathVariable int courtId, @RequestBody T t);
	
	@DeleteMapping("{id}")
	ResponseEntity<String> deleteById(@PathVariable Integer id);








}
