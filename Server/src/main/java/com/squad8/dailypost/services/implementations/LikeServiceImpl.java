package com.squad8.dailypost.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.squad8.dailypost.models.entities.Like;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.repositories.LikeRepository;
import com.squad8.dailypost.services.LikeService;

import jakarta.transaction.Transactional;

@Service
public class LikeServiceImpl implements LikeService {
	@Autowired
	LikeRepository likeRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(String id) throws Exception {
		UUID code = UUID.fromString(id);
		likeRepository.deleteById(code);
		
	}

	@Override
	public List<Like> findAll() {
		return likeRepository.findAll();
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(Post post, User user) throws Exception {
		Like like = new Like(post, user);
		
		likeRepository.save(like);
		
	}

}
