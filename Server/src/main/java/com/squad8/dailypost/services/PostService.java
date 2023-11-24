package com.squad8.dailypost.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.squad8.dailypost.models.dtos.SavePostDTO;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;

import jakarta.validation.Valid;

public interface PostService {
	void save(SavePostDTO info, User user) throws Exception;
	void toggleArchived(Post post,boolean Status)  throws Exception;
	Post findOneById(String id);
	Page<Post> findByTitle(String title,int page, int size);
	List<Post> findAll();
	Page<Post> findAll(int page, int size);
	void update(Post post, @Valid SavePostDTO info) throws Exception;
	Page<Post> getPaginatedList(List<Post> list, int page, int size);
	Page<Post> getLatestPosts(int page, int size);
}
