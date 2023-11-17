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
@Table(name = "comments")
public class Comment {
	
	
	public Comment(Post post, User user,String text) {
		super();
		this.post = post;
		this.user = user;
		this.text = text;
	}
	
	public Comment() {}

	@Id
	@Column(name = "id_comment")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_post", nullable = true)
	private Post post;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user", nullable = true)
	private User user;
    
    @Column(name = "text")
    private String text;
    

}
