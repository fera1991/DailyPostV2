package com.squad8.dailypost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.PageDTO;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.PostService;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@Autowired
	private JWTTools jwtTools;
	
	@GetMapping("/username")
	public ResponseEntity<?> findAll(@RequestParam(defaultValue = "") String fragment){
		List<User> users = userService.findAllByUsername(fragment);
		return new ResponseEntity<>( users,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> findAll(){
		List<User> users = userService.findAll();
		return new ResponseEntity<>( users,HttpStatus.OK);
	}
	
	@GetMapping("/posts/{id}")
	public ResponseEntity<?> findPosts(@PathVariable(name = "id") String code, @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size){
		User user = userService.findOneById(code);
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		Page<Post> posts = postService.getPaginatedList(user.getPosts(), page, size);
		return new ResponseEntity<>(new PageDTO<>(
				posts.getContent(),
				posts.getNumber(),
				posts.getSize(),
				posts.getTotalElements(),
				posts.getTotalPages()
				)
				,HttpStatus.OK);
	}
	
	

	

}
