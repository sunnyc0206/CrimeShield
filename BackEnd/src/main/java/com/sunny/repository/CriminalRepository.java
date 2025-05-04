package com.sunny.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunny.entity.Criminal;

@Repository
public interface CriminalRepository extends JpaRepository<Criminal, Integer> {

    @Query("FROM Criminal c")
    List<Criminal> findAll();
    
    @Query("From Criminal b where b.criminalLocation LIKE %:criminalLocation%")
    List<Criminal> findByLocation(@Param("criminalLocation") String criminalLocation);

    @Query("From Criminal a where a.aadharNumber=:aadharNumber")
	Optional<Criminal> findByAadharNumber(String aadharNumber);
}
