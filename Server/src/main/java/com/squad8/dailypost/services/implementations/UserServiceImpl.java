package com.squad8.dailypost.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.entities.Token;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.repositories.TokenRepository;
import com.squad8.dailypost.repositories.UserRepository;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	public PasswordEncoder passwordEncoder;
	
	@Autowired
	private JWTTools jwtTools;
	
	@Autowired
	private TokenRepository tokenRepository;

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
	
	@Override
	public User findUserAuthenticated() {
		String username = SecurityContextHolder
			.getContext()
			.getAuthentication()
			.getName();
		
		return userRepository.findOneByUsernameOrEmail(username, username);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public Token registerToken(User user) throws Exception {
		cleanTokens(user);
		
		String tokenString = jwtTools.generateToken(user);
		Token token = new Token(tokenString, user);
		
		tokenRepository.save(token);
		
		return token;
	}

	@Override
	public Boolean isTokenValid(User user, String token) {
		try {
			cleanTokens(user);
			List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
			
			tokens.stream()
				.filter(tk -> tk.getContent().equals(token))
				.findAny()
				.orElseThrow(() -> new Exception());
			
			return true;
		} catch (Exception e) {
			return false;
		}		
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void cleanTokens(User user) throws Exception {
		List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
		
		tokens.forEach(token -> {
			if(!jwtTools.verifyToken(token.getContent())) {
				token.setActive(false);
				tokenRepository.save(token);
			}
		});
		
	}

}
