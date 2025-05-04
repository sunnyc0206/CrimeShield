package com.sunny.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunny.entity.User;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> 

{
	 @Query("FROM User u")
	 List<User> findAll();

	@Query("FROM User WHERE email=:email")
	User findByEmail(@Param("email") String email);
	

	@Query("FROM User WHERE mobile=:mobile")
	User findByPhone(@Param("mobile") String phone);


	
}