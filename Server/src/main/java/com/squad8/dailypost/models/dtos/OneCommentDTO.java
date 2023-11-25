package com.squad8.dailypost.models.dtos;

import java.util.UUID;

import com.squad8.dailypost.models.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OneCommentDTO {
	private UUID code;
	private User user;
	private String text;
}
