package com.sunny.controller;

import java.util.Collection;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.entity.FIR;
import com.sunny.model.FirInputModel;
import com.sunny.model.FirOutputModel;
import com.sunny.model.FirStatusUpdateInputModel;
import com.sunny.resource.firResource;
import com.sunny.service.FirService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/FIR")
@CrossOrigin(origins = "http://localhost:3000")
public class FIRController implements firResource<FIR> {

	private static Logger log = LoggerFactory.getLogger(FIRController.class);
	
    @Autowired
    private FirService<FIR> firService;
    
    @Override
    public ResponseEntity<FIR> registerFIR(@RequestBody FirInputModel firInputModel) {
    	log.info("FIRController : register");
        FIR fir = firService.registerFIR(firInputModel);
        return new ResponseEntity<>(fir, HttpStatus.CREATED);
    }

    @Override 
    public ResponseEntity<FIR> updateCaseStatus(@PathVariable Integer id,@RequestBody FirStatusUpdateInputModel firstatusUpdateInputModel) {
        FIR updatedFIR = firService.updateCaseStatus(id, firstatusUpdateInputModel);
        return new ResponseEntity<>(updatedFIR, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<String> deleteById(Integer id) {
        return new ResponseEntity<>(firService.deleteById(id), HttpStatus.OK);
    }
    
    @Override
    public Collection<FirOutputModel> findAll() {
        return firService.findAll();
    }

    @Override
    public Collection<FirOutputModel> findByLocation(String location) {
        return firService.findByLocation(location);
    }

    @Override
    public Optional<FirOutputModel> findById(Integer id) {
        return firService.findById(id);
    }


 


}