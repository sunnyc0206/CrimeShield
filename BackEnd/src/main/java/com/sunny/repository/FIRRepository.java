package com.sunny.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunny.entity.FIR;

@Repository
public interface FIRRepository extends JpaRepository<FIR,Integer> {

//    @Query("FROM FIR b WHERE b.crimeType LIKE %:searchText% OR  b.crimeStatus LIKE %:searchText%")
//    List<FIR> findAllFIR(@Param("searchText") String searchText);
    
	@Query("SELECT c FROM FIR c" )
	List<FIR> findAll();


    @Query("From FIR b  where b.crimeLocation=:crimeLocation")
    List<FIR> findByLocation(@Param("crimeLocation") String crimeLocation);
    
}
