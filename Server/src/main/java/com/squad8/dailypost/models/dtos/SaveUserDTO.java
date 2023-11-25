package com.squad8.dailypost.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveUserDTO {
	@NotEmpty
	private String username;
	
	@NotEmpty
	private String email;
	
	@NotEmpty 
	private String password;

}
