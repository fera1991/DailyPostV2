package com.squad8.dailypost.services;


import java.util.List;

import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.entities.Token;
import com.squad8.dailypost.models.entities.User;

public interface UserService {
	User findOneById(String id);
	User findOneByIdentifier(String identifier);
	List<User> findAllByUsername(String fragment);
	List<User> findAll();
	void save(SaveUserDTO info)throws Exception;
	Boolean comparePassword(String toCompare, String current);
	
	//Token management
	Token registerToken(User user) throws Exception;
	Boolean isTokenValid(User user, String token);
	void cleanTokens(User user) throws Exception;
	
	//Find User authenticated
	User findUserAuthenticated();
}
