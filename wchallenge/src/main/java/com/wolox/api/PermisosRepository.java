package com.wolox.api;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface PermisosRepository extends CrudRepository<Permisos, Integer>{
		
	Optional<Permisos> findById(Long id);	
	
}
