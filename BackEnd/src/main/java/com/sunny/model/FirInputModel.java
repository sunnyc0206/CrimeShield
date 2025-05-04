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
public class FirInputModel{
		

       private String crimeLocation;
       private String crimeType;
       private int criminalId;
       private int courtId;
       @Enumerated(EnumType.STRING)
   	   private CrimeStatus crimeStatus;
       private String crimeWeapon;
   	   private String victimName;
   	   private String victimPhone;
   	   private String victimAddress;
       
}
