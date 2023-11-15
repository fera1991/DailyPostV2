package com.squad8.dailypost.models.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "favorites")
public class Favorite {
	public Favorite(Post post, User user) {
		super();
		this.post = post;
		this.user = user;
	}

	@Id
	@Column(name = "id_favorite")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_post", nullable = true)
	private Post post;
    
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user", nullable = true)
    private User user;
}
