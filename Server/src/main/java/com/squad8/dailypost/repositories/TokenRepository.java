package com.squad8.dailypost.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.squad8.dailypost.models.entities.Token;
import com.squad8.dailypost.models.entities.User;


public interface TokenRepository 
extends ListCrudRepository<Token, UUID>{ 

List<Token> findByUserAndActive(User user, Boolean active);

}
