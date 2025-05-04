package com.sunny.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunny.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> 

{

	@Query("FROM Role WHERE name=:name")
	Role findByName(@Param("name") String name);

	
}