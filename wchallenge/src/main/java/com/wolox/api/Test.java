package com.wolox.api;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

//@SpringBootApplication
public class Test {

	private static final Logger log = LoggerFactory.getLogger(Test.class);

	public static void main(String[] args) {
		SpringApplication.run(Test.class, args);
	}

	@Bean
	public CommandLineRunner demo(PermisosRepository repository) {
		return (args) -> {

			List<Permisos> permisos = repository.findByUserId(1);

			// fetch all customers
			log.info("Customers found with findByPermisoId():");
			log.info("-------------------------------");
			
			for (Permisos permiso : permisos) {				
				log.info(permiso.toString());
			}
			log.info("");
						
			Permisos permiso = new Permisos(2,11,true,false);
			repository.save(permiso);	
		};
	}

	
}
