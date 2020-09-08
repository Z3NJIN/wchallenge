package com.wolox.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatabaseHelper {

	@Autowired
	private PermisosRepository permisosRepository;

	//Obtener permisos
	public List<Permisos> getPermisos(Integer userId) {
		
		return permisosRepository.findByUserId(userId);
		
	}
	
	//Guardar permisos
	public void getPermisos(Permisos permisos) {

		permisosRepository.save(permisos);
		
	}

}
