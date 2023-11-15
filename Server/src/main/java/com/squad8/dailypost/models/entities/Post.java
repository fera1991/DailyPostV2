package com.squad8.dailypost.models.entities;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Entity
@ToString(exclude = {"comments","favorites","likes"})
@Data
@Table(name = "posts")
public class Post {
	

	public Post(String title, String image, String description, User user) {
		super();
		this.title = title;
		this.image = image;
		this.description = description;
		this.user = user;
	}

	@Id
	@Column(name = "id_post")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "image")
    private String image;
	
	@Column(name = "description")
    private String description;
	
	@Column(name = "isArchived")
    private boolean isArchived;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user", nullable = true)
	private User user;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Comment> comments;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Favorite> favorites;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Like> likes;

}
