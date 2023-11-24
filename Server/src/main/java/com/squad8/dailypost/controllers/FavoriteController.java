package com.squad8.dailypost.controllers;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.squad8.dailypost.models.dtos.MessageDTO;
import com.squad8.dailypost.models.dtos.PageDTO;
import com.squad8.dailypost.models.entities.Favorite;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.services.FavoriteService;
import com.squad8.dailypost.services.PostService;
import com.squad8.dailypost.services.UserService;
import com.squad8.dailypost.utils.JWTTools;
import com.squad8.dailypost.utils.RequestErrorHandler;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/post/fav")
@CrossOrigin("*")
public class FavoriteController {
	
	@Autowired
	private FavoriteService favoriteService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JWTTools jwtTools;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@PatchMapping("/{id}")
	public ResponseEntity<?> toggleFavorite(@PathVariable(name = "id") String code, HttpServletRequest request){
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
		String idFavorite = "";
		for (Favorite element: user.getFavorites()) {
			if(element.getPost().equals(post)) {
				flag = true;
				idFavorite = element.getCode().toString();
			}
		}
			
		try {
			
			if(!flag) {
				favoriteService.save(post, user);
				return new ResponseEntity<>(
						new MessageDTO("The post has been saved to your favorites."), HttpStatus.CREATED);
			}else {
				favoriteService.deleteById(idFavorite);
				return new ResponseEntity<>(
						new MessageDTO("The post has been removed from your favorites."), HttpStatus.CREATED);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getOwnFavorite(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size, HttpServletRequest request){
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		List<Favorite> favoritePosts = user.getFavorites();
		
		favoritePosts.sort(Comparator.comparing(Favorite::getCreatedAt).reversed());
		
		Page<Favorite> posts = favoriteService.getPaginatedList(favoritePosts, page, size);
		return new ResponseEntity<>(new PageDTO<>(
				posts.getContent(),
				posts.getNumber(),
				posts.getSize(),
				posts.getTotalElements(),
				posts.getTotalPages()
				)
				,HttpStatus.OK);
		
	}
	
	@GetMapping("/entirety")
	public ResponseEntity<?> getAllOwnFavorite(@RequestParam(defaultValue = "10") int size, HttpServletRequest request){
		String tokenHeader = request.getHeader("Authorization");
		String token = tokenHeader.substring(7);
		
		User user = userService.findOneByIdentifier(jwtTools.getUsernameFrom(token));
		return new ResponseEntity<>(user.getFavorites(),HttpStatus.OK);
		
	}

}
