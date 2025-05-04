package com.sunny.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sunny.utils.CrimeStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "FIR")
public class FIR {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer fID;
	
	@Column(nullable = false)
	private String crimeLocation;

	@Column(nullable = false)
	private String crimeType;
	
	@Enumerated(EnumType.STRING)
	private CrimeStatus crimeStatus;
	
	@Column(nullable = false)
	private LocalDateTime firRegisterDate;  
	
	@Column(nullable = false)
	private String crimeWeapon;
	
	@Column(nullable = false)
	private String victimName;
	
	@Column(nullable = false)
	private String victimPhone;
	
	@Column(nullable = false)
	private String victimAddress;

	@ManyToOne
	@JoinColumn(name = "criminal_id")
	private Criminal criminal;
	
	
	@ManyToOne
	@JoinColumn(name = "court_id")
	private Court court;
	

}
