package com.squad8.dailypost.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.PageDTO;
import com.squad8.dailypost.models.dtos.SavePostDTO;
import com.squad8.dailypost.models.entities.Favorite;
import com.squad8.dailypost.models.entities.Like;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.LikeService;
import com.squad8.dailypost.services.PostService;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/post")
@CrossOrigin("*")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private LikeService likeService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JWTTools jwtTools;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@PostMapping("/create")
	public ResponseEntity<?> savePost(@RequestBody @Valid SavePostDTO info, BindingResult validations, HttpServletRequest request){
		
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
		}
		
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		try {
			postService.save(info, user);
			return new ResponseEntity<>(
					new MessageDTO("Post Created"), HttpStatus.CREATED);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePost(@RequestBody @Valid SavePostDTO info,  BindingResult validations, @PathVariable(name = "id") String code, HttpServletRequest request){
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
		}
		Post post = postService.findOneById(code);
		if(post == null) {
			return new ResponseEntity<>(new MessageDTO("Post Not Found"),HttpStatus.NOT_FOUND);
		}
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		if(user != post.getUser()) {
			return new ResponseEntity<>(new MessageDTO("Access denied. You do not have the necessary permissions to modify this post"),HttpStatus.FORBIDDEN);
		}
		
		try {
			postService.update(post, info);
			return new ResponseEntity<>(
					new MessageDTO("Post updated"), HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size){
		Page<Post> posts = postService.findAll(page, size);
		return new ResponseEntity<>(new PageDTO<>(
				posts.getContent(),
				posts.getNumber(),
				posts.getSize(),
				posts.getTotalElements(),
				posts.getTotalPages()
				)
				,HttpStatus.OK);
	}
	
	@GetMapping("/owned")
	public ResponseEntity<?> findOwn(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size, HttpServletRequest request){
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
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
	
	@PatchMapping("toggle/{id}")
	public ResponseEntity<?> togglePostVisibility(@PathVariable(name = "id") String code, HttpServletRequest request){
		Post post = postService.findOneById(code);
		if(post == null) {
			return new ResponseEntity<>(new MessageDTO("Post Not Found"),HttpStatus.NOT_FOUND);
		}
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		if(user != post.getUser()) {
			return new ResponseEntity<>(new MessageDTO("Access denied. You do not have the necessary permissions to modify this post"),HttpStatus.FORBIDDEN);
		}
		
		try {
			if(post.isArchived()) {
				postService.toggleArchived(post, false);
				return new ResponseEntity<>(
						new MessageDTO("Post active"), HttpStatus.OK);
			}
			else {
				postService.toggleArchived(post, true);
				return new ResponseEntity<>(
						new MessageDTO("Post Archived"), HttpStatus.OK);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PatchMapping("like/{id}")
	public ResponseEntity<?> toggleLike(@PathVariable(name = "id") String code, HttpServletRequest request){
		Post post = postService.findOneById(code);
		if(post == null) {
			return new ResponseEntity<>(new MessageDTO("Post Not Found"),HttpStatus.NOT_FOUND);
		}
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		
		if(user == null) {
			return new ResponseEntity<>(new MessageDTO("User Not Found"),HttpStatus.NOT_FOUND);
		}
		
		Boolean flag = false;
		String idLike = "";
		for (Like element: post.getLikes()) {
			if(element.getUser().equals(user)) {
				flag = true;
				idLike = element.getCode().toString();
			}
		}
		
		try {
			if(!flag) {
				likeService.save(post, user);
				return new ResponseEntity<>(
						new MessageDTO("The post has been Liked "), HttpStatus.CREATED);
			}else {
				likeService.deleteById(idLike);
				return new ResponseEntity<>(
						new MessageDTO("The post has been removed from your Likes."), HttpStatus.CREATED);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
