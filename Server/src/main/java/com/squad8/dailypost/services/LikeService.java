package com.squad8.dailypost.services;

import java.util.List;

import com.squad8.dailypost.models.entities.Like;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;

public interface LikeService {
	void save(Post post, User user) throws Exception;
	void deleteById(String id) throws Exception;
	List<Like> findAll();

}
