package com.squad8.dailypost.services;

import com.squad8.dailypost.models.dtos.SaveCommentDTO;
import com.squad8.dailypost.models.entities.Comment;
import com.squad8.dailypost.models.entities.Post;
import com.squad8.dailypost.models.entities.User;

public interface CommentService {
	Comment save(SaveCommentDTO info, Post post, User user) throws Exception;
	void deleteById(String id) throws Exception;

}
