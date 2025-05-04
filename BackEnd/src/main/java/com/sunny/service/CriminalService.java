package com.sunny.service;

import java.util.Collection;
import java.util.Optional;

import com.sunny.entity.Criminal;
import com.sunny.model.CriminalOutputModel;


public interface CriminalService<T> {
	Collection<CriminalOutputModel> findAll();
	Optional<CriminalOutputModel> findById(Integer id);
	Collection<CriminalOutputModel> findByLocation(String loc);
	String deleteById(Integer id);
	T updateCriminal(Integer criminalId, T t);
	Criminal registerCriminal(Criminal criminal);
	



}
