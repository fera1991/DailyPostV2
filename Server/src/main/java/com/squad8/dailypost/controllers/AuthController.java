package com.squad8.dailypost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.SaveUserDTO;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
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
	                new MessageDTO("Email already exists"), HttpStatus.ACCEPTED);
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
