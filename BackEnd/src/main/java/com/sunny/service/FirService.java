package com.sunny.service;

import java.util.Collection;
import java.util.Optional;

import com.sunny.entity.FIR;
import com.sunny.model.FirInputModel;
import com.sunny.model.FirOutputModel;
import com.sunny.model.FirStatusUpdateInputModel;


public interface FirService<T> {
	
	Optional<FirOutputModel> findById(Integer id);
	Collection<FirOutputModel> findByLocation(String loc);
	String deleteById(Integer id);

	FIR registerFIR(FirInputModel firInputModel);
	
	Collection<FirOutputModel> findAll();
	FIR updateCaseStatus(Integer id, FirStatusUpdateInputModel firStatusUpdateInputModel);




}
