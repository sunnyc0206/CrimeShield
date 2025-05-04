package com.sunny.resource;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.sunny.entity.Court;



public interface Resource<T> {
	
	
	@GetMapping("/{search}")
	public Collection<T> findAll(String searchText);

	@GetMapping("/{id}")
	public Optional<T> findById(@RequestParam(value="id") Integer id);
	
	@GetMapping("/{location}")
	public Optional<Court> findByLocation(@RequestParam(value="location")String location);
	
	@SuppressWarnings("deprecation")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	ResponseEntity<T> save(@RequestBody T t);
	
	@SuppressWarnings("deprecation")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	ResponseEntity<T> update(@RequestBody T t);
	
	@DeleteMapping("{id}")
	ResponseEntity<String> deleteById(@PathVariable Integer id);








}
