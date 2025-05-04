package com.sunny.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FirUpdateInputModel {
	
	
    private Long fid;
    private String crimeLocation;
    private String crimeType;
    private String crimeWeapon;


}
