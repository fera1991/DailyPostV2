package com.squad8.dailypost.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.squad8.dailypost.models.dtos.CommentsDTO;
import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.OneCommentDTO;
import com.squad8.dailypost.models.dtos.SaveCommentDTO;
import com.squad8.dailypost.models.entities.Comment;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.CommentService;
import com.squad8.dailypost.services.PostService;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/post/comment")
@CrossOrigin("*")
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private JWTTools jwtTools;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@PostMapping("/{id}")
	public ResponseEntity<?> addComment(@RequestBody @Valid SaveCommentDTO info,@PathVariable(name = "id") String code, BindingResult validations, HttpServletRequest request){
		
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
		
		Post post = postService.findOneById(code);
		
		if(post == null) {
			return new ResponseEntity<>(new MessageDTO("Post Not Found"),HttpStatus.NOT_FOUND);
		}
		
		try {
			commentService.save(info, post, user);
			return new ResponseEntity<>(
					new MessageDTO("Comment Created"), HttpStatus.CREATED);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<?> getComments(@PathVariable(name = "id") String code){
		Post post = postService.findOneById(code);
		
		if(post == null) {
			return new ResponseEntity<>(new MessageDTO("Post Not Found"),HttpStatus.NOT_FOUND);
		}
		
		try {
			List<OneCommentDTO> comments = new ArrayList<>();
			 for (Comment element : post.getComments()) {
				 comments.add(new OneCommentDTO(element.getCode(),element.getUser(),element.getText()));
		        }
			return new ResponseEntity<>(new CommentsDTO(
					post,
					comments
					), HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

}
