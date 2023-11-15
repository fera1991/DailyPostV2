package com.squad8.dailypost.services.implementations;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.repositories.UserRepository;
import com.squad8.dailypost.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	public PasswordEncoder passwordEncoder;

	@Override
	public User findOneById(String id) {
		try {
			UUID code = UUID.fromString(id);
			return userRepository.findById(code).orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public User findOneByIdentifier(String identifier) {
		return userRepository.findOneByUsernameOrEmail(identifier, identifier);
	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(SaveUserDTO info) throws Exception {
		User user = new User(
				info.getUsername(),
				info.getEmail(),
				passwordEncoder.encode(info.getPassword())
				);
		userRepository.save(user);
	}

	@Override
	public Boolean comparePassword(String toCompare, String current) {
		return passwordEncoder.matches(toCompare, current);
	}

}
