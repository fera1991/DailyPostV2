package com.squad8.dailypost.services;


import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.entities.User;

public interface UserService {
	User findOneById(String id);
	User findOneByIdentifier(String identifier);
	void save(SaveUserDTO info)throws Exception;
	Boolean comparePassword(String toCompare, String current);
}
