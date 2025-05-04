package com.sunny.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunny.entity.Court;

@Repository
public interface CourtRepository extends JpaRepository<Court,Integer > {

    @Query("Select b From Court b where b.courtLocation LIKE %:courtLocation%")
    Optional<Court> findByLocation(@Param("courtLocation") String courtLocation);
    
    @Query("FROM Court c")
    List<Court> findAll();

    
	
}
