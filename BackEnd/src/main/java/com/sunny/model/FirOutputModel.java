package com.sunny.model;

import com.sunny.utils.CrimeStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FirOutputModel {


		
		private int fId;
	    private String criminalName;
	    private int cId;
	    private String criminalDob;
	    private String criminalLocation;
	    private String crimeType;
	    private String crimeWeapon;
	    private String courtLocation;
	    private String crimeLocation;
	    private String firRegisterDate;  
	    private CrimeStatus crimeStatus;
	    private String victimName;
	   	private String victimPhone;
	   	private String victimAddress;
	
	    
}
