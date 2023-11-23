package com.squad8.dailypost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.squad8.dailypost.models.dtos.LoginDTO;
import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.dtos.TokenDTO;
import com.squad8.dailypost.models.entities.Token;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@Autowired
	private JWTTools jwtTools;
	
	@GetMapping("/whoami")
	public ResponseEntity<?> whoami(HttpServletRequest request){
		
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
			

			if(user == null) {
				return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
			}
			
			try {
				return new ResponseEntity<>(user, HttpStatus.OK);
				
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(
						new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		}
	
	@PostMapping("/signin")
	public ResponseEntity<?> login(@RequestBody @Valid LoginDTO info, BindingResult validations){
		
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
		}
		
		User user = userService.findOneByIdentifier(info.getUsername());
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		if(!userService.comparePassword(info.getPassword(), user.getPassword())) {
			return new ResponseEntity<>(new MessageDTO("the password is not the same"),HttpStatus.UNAUTHORIZED);
		}
		
		try {
			Token token = userService.registerToken(user);
			return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Valid SaveUserDTO info, BindingResult validations){
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
		}
		
		User response = userService.findOneByIdentifier(info.getEmail());
		
		if(response != null) {
			return new ResponseEntity<>(
	                new MessageDTO("Email already exists"), HttpStatus.CONFLICT);
		}
		
		User responseUsername = userService.findOneByIdentifier(info.getUsername());
		if(responseUsername != null) {
			return new ResponseEntity<>(
	                new MessageDTO("Username already exists"), HttpStatus.CONFLICT);
		}
		
		
		try { 
			userService.save(info);
			return new ResponseEntity<>(
					new MessageDTO("User Created"), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
