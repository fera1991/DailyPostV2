package com.squad8.dailypost.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageImpl;

import com.squad8.dailypost.models.dtos.SavePostDTO;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;
import com.squad8.dailypost.repositories.PostRepository;
import com.squad8.dailypost.services.PostService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	PostRepository postRepository;
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(SavePostDTO info, User user) throws Exception {
		Post post = new Post(info.getTitle(),info.getImage(),info.getDescription(),user);
		postRepository.save(post);
	}

	@Override
	public Post findOneById(String id) {
		try {
			UUID code = UUID.fromString(id);
			return postRepository.findById(code).orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Page<Post> findByTitle(String title, int page, int size) {
		Pageable pageable = PageRequest.of(page,size);
		return postRepository.findByTitleContaining(title,pageable);
	}

	@Override
	public List<Post> findAll() {
		return postRepository.findAll();
	}

	@Override
	public Page<Post> findAll(int page, int size) {
		Pageable pageable = PageRequest.of(page,size);
		return postRepository.findAll(pageable);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(Post post, @Valid SavePostDTO info) throws Exception {
		Post updatePost = post;
		updatePost.setTitle(info.getTitle());
		updatePost.setImage(info.getImage());
		updatePost.setDescription(info.getDescription());
		postRepository.save(updatePost);
	}

	@Override
	public Page<Post> getPaginatedList(List<Post> list, int page, int size) {
		int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, list.size());
        
        List<Post> sublist = list.subList(startIndex, endIndex);
        PageRequest pageRequest = PageRequest.of(page, size);
        
        return new PageImpl<>(sublist, pageRequest, list.size());
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void toggleArchived(Post post, boolean Status) throws Exception {
		Post updatePost = post;
		updatePost.setArchived(Status);
		postRepository.save(updatePost);
	}

	@Override
	public Page<Post> getLatestPosts(int page, int size) {
		Pageable pageable = PageRequest.of(page,size);
        return postRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

}
