package com.sunny.entity;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sunny.utils.CriminalGender;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@Table(name = "criminal")
public class Criminal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cID;
    
    @Column(nullable = false)
    private String criminalName;

    @Column(nullable = false)
    private String criminalEthnicity;

    @Column(nullable = false)
    @JsonFormat
    private LocalDate criminalDOB;

    @Column(nullable = false)
    private int criminalHeight;
    
    @Column(nullable = false)
    private String criminalLocation;
    
    @Column(nullable = false , length=12)
    private String aadharNumber;
    
    @Enumerated(EnumType.STRING)
    private CriminalGender criminalGender;
    
    @JsonIgnore
    @OneToMany(targetEntity = FIR.class, mappedBy = "criminal", fetch = FetchType.LAZY)
    private Set<FIR> fir;
}
