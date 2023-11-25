package com.squad8.dailypost.models.dtos;

import com.squad8.dailypost.models.entities.Token;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDTO {

	private String token;
	
	public TokenDTO(Token token) {
		this.token = token.getContent();
	}
	
}
