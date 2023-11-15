package com.squad8.dailypost.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCommentDTO {
	@NotEmpty
	private String id_post;
	
	@NotEmpty
	private String id_user;
	
	@NotEmpty
	private String text;

}
