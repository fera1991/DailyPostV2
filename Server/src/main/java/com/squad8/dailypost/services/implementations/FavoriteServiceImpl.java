package com.squad8.dailypost.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.squad8.dailypost.models.entities.Favorite;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.repositories.FavoriteRepository;
import com.squad8.dailypost.services.FavoriteService;

import jakarta.transaction.Transactional;

@Service
public class FavoriteServiceImpl implements FavoriteService {
	
	@Autowired
	FavoriteRepository favoriteRepository;
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(Post post, User user) throws Exception {
		Favorite favorite = new Favorite(post, user);
		favoriteRepository.save(favorite);
		
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(String id) throws Exception {
		UUID code = UUID.fromString(id);
		favoriteRepository.deleteById(code);
		
	}

	@Override
	public List<Favorite> findAll() {
		return favoriteRepository.findAll();
	}
	
	@Override
	public Page<Favorite> getPaginatedList(List<Favorite> list, int page, int size) {
		int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, list.size());
        
        List<Favorite> sublist = list.subList(startIndex, endIndex);
        PageRequest pageRequest = PageRequest.of(page, size);
        
        return new PageImpl<>(sublist, pageRequest, list.size());
	}

}
