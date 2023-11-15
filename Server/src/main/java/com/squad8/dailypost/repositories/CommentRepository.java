package com.squad8.dailypost.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.squad8.dailypost.models.entities.Comment;



public interface CommentRepository extends ListCrudRepository<Comment, UUID>{

}