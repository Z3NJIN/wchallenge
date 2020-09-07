package com.wolox.api;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Test {

	private static final Logger log = LoggerFactory.getLogger(Test.class);

	public static void main(String[] args) {
		SpringApplication.run(Test.class, args);
	}

	@Bean
	public CommandLineRunner demo(PermisosRepository repository) {
		return (args) -> {

			Optional<Permisos> permisos = repository.findById(4L);

			// fetch all customers
			log.info("Customers found with findByPermisoId():");
			log.info("-------------------------------");
			log.info(permisos.toString());
			log.info("");
						
			Permisos permiso = new Permisos(2,11,true,false);
			repository.save(permiso);	
		};
	}

	
}
