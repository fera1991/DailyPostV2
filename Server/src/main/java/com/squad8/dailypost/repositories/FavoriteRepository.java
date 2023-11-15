package com.squad8.dailypost.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.squad8.dailypost.models.entities.Favorite;

public interface FavoriteRepository extends ListCrudRepository<Favorite, UUID>{

}
