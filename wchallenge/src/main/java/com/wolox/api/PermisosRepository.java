package com.wolox.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermisosRepository extends JpaRepository<Permisos, Integer>{

	List<Permisos> findByUserId(Integer userId);
	
	Permisos findByUserIdAndAlbumId(Integer userId, Integer albumId);
	
	List<Permisos> findByAlbumIdAndLecturaAndEscritura(Integer albumId, boolean lectura, boolean escritura);
}
