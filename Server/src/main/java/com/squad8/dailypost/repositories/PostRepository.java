package com.squad8.dailypost.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.squad8.dailypost.models.entities.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {
	Page<Post> findByTitleContaining(String fragment, Pageable pageable);
	Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
