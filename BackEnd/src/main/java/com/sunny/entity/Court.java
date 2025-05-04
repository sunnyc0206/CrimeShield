package com.sunny.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "Court")
public class Court {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int courtId;

	@Column(nullable = false)
	private String judgeName;

	@Column(nullable = false)
	private String courtLocation;

	@Column(nullable = false)
	private String courtType;
	
	@Column(nullable = false,columnDefinition = "int default 0")
	private int activeCases;
	
	@Column(nullable = false,columnDefinition = "int default 0")
	private int solvedCases;
	
	@JsonIgnore
	@OneToMany(targetEntity = FIR.class, mappedBy = "court", fetch = FetchType.LAZY)
	private Set<FIR> fir;
}
