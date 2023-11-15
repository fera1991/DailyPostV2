package com.squad8.dailypost.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.squad8.dailypost.models.entities.User;

public interface UserRepository extends ListCrudRepository<User, UUID>{
	public User findOneByUsernameOrEmail(String username, String email);
}
