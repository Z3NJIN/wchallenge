package com.wolox.api;

import java.util.ArrayList;

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
	
	@GetMapping("/users")
	public ResponseEntity<Object[]> getUsers() {
		
		String url = Constants.API_ENDPOINT + "/users";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<User[]> response = restTemplate.getForEntity(url, User[].class);  
		User[] users = response.getBody();
		
		return new ResponseEntity<Object[]>(users,HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<Object> getUser(@RequestParam("userId") String userId) {

		String url = Constants.API_ENDPOINT + "/users/" + userId;
		
		RestTemplate restTemplate = new RestTemplate();        
		User user = restTemplate.getForObject(url, User.class);		
				             
        return new ResponseEntity<Object>(user, HttpStatus.OK);
	}
	
	@GetMapping("/photos")
	public ResponseEntity<Object[]> getPhotos() {
		
		String url = Constants.API_ENDPOINT + "/photos";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Photo[]> response = restTemplate.getForEntity(url, Photo[].class);  
		Photo[] photos = response.getBody();
		
		return new ResponseEntity<Object[]>(photos,HttpStatus.OK);
	}
	
	@GetMapping("/photo")
	public ResponseEntity<Object> getPhoto(@RequestParam("photoId") String photoId) {

		String url = Constants.API_ENDPOINT + "/photos/" + photoId;
		
		RestTemplate restTemplate = new RestTemplate();        
		Photo photo = restTemplate.getForObject(url, Photo.class);		
				             
        return new ResponseEntity<Object>(photo, HttpStatus.OK);
	}
	
	@GetMapping("/albums")
	public ResponseEntity<Object[]> getAlbums() {
		
		String url = Constants.API_ENDPOINT + "/albums";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Album[]> response = restTemplate.getForEntity(url, Album[].class);  
		Album[] albums = response.getBody();
		
		return new ResponseEntity<Object[]>(albums,HttpStatus.OK);
	}
	
	@GetMapping("/album")
	public ResponseEntity<Object> getAlbum(@RequestParam("albumId") String albumId) {

		String url = Constants.API_ENDPOINT + "/albums/" + albumId;
		
		RestTemplate restTemplate = new RestTemplate();        
		Album album = restTemplate.getForObject(url, Album.class);		
				              
        return new ResponseEntity<Object>(album, HttpStatus.OK);
	}
	
	@GetMapping("/user/album")
	public ResponseEntity<Object[]> getUserAlbums(@RequestParam("userId") String userId) {

		String url = Constants.API_ENDPOINT + "/users/" + userId + "/albums";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Album[]> response = restTemplate.getForEntity(url, Album[].class);  
		Album[] albums = response.getBody();
		
		return new ResponseEntity<Object[]>(albums,HttpStatus.OK);
	}
	
	@GetMapping("/user/photos")
	public ResponseEntity<ArrayList<Object>> getUserPhotos(@RequestParam("userId") String userId) {

		//Obtenemos los albumes primero, ej:  https://jsonplaceholder.typicode.com/users/2/albums
		String urlAlbums = Constants.API_ENDPOINT + "/users/" + userId + "/albums";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Album[]> responseAlbums = restTemplate.getForEntity(urlAlbums, Album[].class);  
		Album[] albums = responseAlbums.getBody();
		
		//Obtenemos las fotos de cada album, ej:  https://jsonplaceholder.typicode.com/albums/1/photos
		String urlPhotos;
		ArrayList<Object> allPhotos = new ArrayList<Object>();
		for (Album album : albums) {
			urlPhotos =  Constants.API_ENDPOINT + "/albums/" + album.getId() + "/photos";
						
			ResponseEntity<Photo[]> responsePhotos = restTemplate.getForEntity(urlPhotos, Photo[].class);  
			Photo[] photos = responsePhotos.getBody();
			
			//Insertamos cada array de fotos en la lista completa de fotos
			for (Photo photo : photos) {				
				allPhotos.add(photo);
			}
		}
		
		return new ResponseEntity<ArrayList<Object>>(allPhotos,HttpStatus.OK);
	}	
	
	public static void main(String[] args) {
		SpringApplication.run(WchallengeApplication.class, args);
	}
}
