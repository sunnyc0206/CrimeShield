package com.sunny.service;

import java.util.Collection;
import java.util.Optional;


public interface CourtService<T> {
	Collection<T> findAll();
	Optional<T> findById(Integer id);
	T update(Integer courtId,T t);
	T save(T t);
	Optional<T>findByLocation(String loc);
	String deleteById(Integer id);




}
