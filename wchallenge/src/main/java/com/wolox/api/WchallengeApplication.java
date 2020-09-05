package com.wolox.api;

import java.util.HashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
@RequestMapping("/api")
public class WchallengeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WchallengeApplication.class, args);
	}

	@GetMapping("/hello")
    public ResponseEntity<Object> hola(@RequestParam(value = "name", defaultValue = "World") String name) {         
		
		String message = String.format("Hello %s!!", name); 
		
		HashMap<String, String> map = new HashMap<>();
		map.put("message", message);
	    map.put("key", "value");
	    map.put("foo", "bar");
	    map.put("aa", "bb");
		
		return new ResponseEntity<Object>(map, HttpStatus.OK);
    }
	
	@GetMapping("/quote")
	public ResponseEntity<Object> hello() {
		
		RestTemplate restTemplate = new RestTemplate();        
        Quote quote = restTemplate.getForObject(Constants.API_ROUTE, Quote.class);
        
        return new ResponseEntity<Object>(quote, HttpStatus.OK);
	}	

}
