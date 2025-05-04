package com.sunny.model;

import com.sunny.utils.CriminalGender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriminalOutputModel {

	private String criminalName;
    private String criminalEthnicity;
    private String criminalDOB;
    private int criminalHeight;
    private String criminalLocation;
    private String aadharNumber;
    private CriminalGender criminalGender; 
    private int cId;
}
