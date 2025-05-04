package com.sunny.model;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.sunny.utils.CrimeStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FirStatusUpdateInputModel {
	
	
    private Integer fid;
    @Enumerated(EnumType.STRING)
	private CrimeStatus crimeStatus;



}
