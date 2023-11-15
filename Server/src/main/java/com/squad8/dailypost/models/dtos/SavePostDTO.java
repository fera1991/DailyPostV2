package com.squad8.dailypost.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavePostDTO {
	
	@NotEmpty
	private String title;
	
	@NotEmpty
	private String image;
	
	@NotEmpty
	private String description;
	
	
}
