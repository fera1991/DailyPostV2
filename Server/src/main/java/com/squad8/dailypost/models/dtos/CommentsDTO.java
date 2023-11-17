package com.squad8.dailypost.models.dtos;

import java.util.List;
import java.util.UUID;

import com.squad8.dailypost.models.entities.Post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentsDTO {
	private Post post;
	private List<OneCommentDTO> comments;

}
