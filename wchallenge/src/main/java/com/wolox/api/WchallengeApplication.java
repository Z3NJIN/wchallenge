package com.wolox.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication()
@RestController
@RequestMapping("/api")
public class WchallengeApplication {
	
	@Autowired
	private PermisosRepository permisosRepository;
		
	//1. Obtener todos los usuarios
	@GetMapping("/users")
	public ResponseEntity<Object[]> getUsers() {
		
		String url = Constants.API_ENDPOINT + "/users";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<User[]> response = restTemplate.getForEntity(url, User[].class);  
		User[] users = response.getBody();
		
		return new ResponseEntity<Object[]>(users,HttpStatus.OK);
	}
	
	//Obtener un usuario específico
	@GetMapping("/user")
	public ResponseEntity<Object> getUser(@RequestParam("userId") String userId) {

		String url = Constants.API_ENDPOINT + "/users/" + userId;
		
		RestTemplate restTemplate = new RestTemplate();        
		User user = restTemplate.getForObject(url, User.class);		
				             
        return new ResponseEntity<Object>(user, HttpStatus.OK);
	}
	
	//2. Obtener todas las fotos
	@GetMapping("/photos")
	public ResponseEntity<Object[]> getPhotos() {
		
		String url = Constants.API_ENDPOINT + "/photos";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Photo[]> response = restTemplate.getForEntity(url, Photo[].class);  
		Photo[] photos = response.getBody();
		
		return new ResponseEntity<Object[]>(photos,HttpStatus.OK);
	}
	
	//Obtener una foto con su id
	@GetMapping("/photo")
	public ResponseEntity<Object> getPhoto(@RequestParam("photoId") String photoId) {

		String url = Constants.API_ENDPOINT + "/photos/" + photoId;
		
		RestTemplate restTemplate = new RestTemplate();        
		Photo photo = restTemplate.getForObject(url, Photo.class);		
				             
        return new ResponseEntity<Object>(photo, HttpStatus.OK);
	}
	
	//3. Obtener todos los álbumes
	@GetMapping("/albums")
	public ResponseEntity<Object[]> getAlbums() {
		
		String url = Constants.API_ENDPOINT + "/albums";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Album[]> response = restTemplate.getForEntity(url, Album[].class);  
		Album[] albums = response.getBody();
		
		return new ResponseEntity<Object[]>(albums,HttpStatus.OK);
	}
	
	//Obtener las fotos de un álbum
	@GetMapping("/album/photos")
	public ResponseEntity<Object[]> getAlbum(@RequestParam("albumId") String albumId) {

		String url = Constants.API_ENDPOINT + "/albums/" + albumId + "/photos";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Photo[]> response = restTemplate.getForEntity(url, Photo[].class);   
		Photo[] photos = response.getBody();
		
		return new ResponseEntity<Object[]>(photos,HttpStatus.OK);
	}
	
	//3. Obtener todos los álbumes de un usuario
	@GetMapping("/user/album")
	public ResponseEntity<Object[]> getUserAlbums(@RequestParam("userId") String userId) {

		String url = Constants.API_ENDPOINT + "/users/" + userId + "/albums";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Album[]> response = restTemplate.getForEntity(url, Album[].class);  
		Album[] albums = response.getBody();
		
		return new ResponseEntity<Object[]>(albums,HttpStatus.OK);
	}
	
	//4. Obtener todas las fotos de un usuario
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
	
	//Obtener un álbum específico compartido con un usuario
	@GetMapping("/shared/album")
	public ResponseEntity<Map<String,Object>> getSharedAlbum(@RequestParam("userId") String userId, @RequestParam("albumId") String albumId) {

		Permisos permisos = permisosRepository.findByUserIdAndAlbumId(Integer.valueOf(userId), Integer.valueOf(albumId));
		
		RestTemplate restTemplate = new RestTemplate(); 
		
		String url =  Constants.API_ENDPOINT + "/albums/" + albumId;
		Album album = restTemplate.getForObject(url, Album.class);
							
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("album", album);
		result.put("permisos", permisos);
				
		return new ResponseEntity<Map<String,Object>>(result,HttpStatus.OK);
	}
	
	//Obtener todos los álbumes compartidos con un usuario
	@GetMapping("/shared/albums")
	public ResponseEntity<ArrayList<Object>> getAllSharedAlbums(@RequestParam("userId") String userId) {

		List<Permisos> permisos = permisosRepository.findByUserId(Integer.valueOf(userId));
		
		RestTemplate restTemplate = new RestTemplate(); 
		
		String url;
		Album album;
		ArrayList<Object> albums = new ArrayList<Object>();
		for (Permisos permiso : permisos) {
			url =  Constants.API_ENDPOINT + "/albums/" + permiso.getAlbumId();
						
			album = restTemplate.getForObject(url, Album.class);			
			albums.add(album);
		}
				
		return new ResponseEntity<ArrayList<Object>>(albums,HttpStatus.OK);
	}
	
	//2.1. Registrar un álbum compartido con un usuario y sus permisos.
	@PostMapping(value="/shared/save", produces = "application/json", consumes = "application/json")
	public ResponseEntity<Map<String, String>> saveSharedAlbum(@RequestBody Permisos permisos) {
		
		permisosRepository.save(permisos);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("message", "Registro guardado exitosamente");
				
		return new ResponseEntity<Map<String,String>>(result,HttpStatus.OK);
	}
	
	//2.2. Cambiar los permisos de un usuario para un álbum determinado
	@PostMapping(value="/shared/update", produces = "application/json", consumes = "application/json")
	public ResponseEntity<Map<String, String>> updateSharedAlbum(@RequestBody Permisos permisos) {
				
		Permisos permisosUpdate = permisosRepository.findByUserIdAndAlbumId(permisos.getUserId(), permisos.getAlbumId());
		permisosUpdate.setLectura(permisos.isLectura());
		permisosUpdate.setEscritura(permisos.isEscritura());
		
		permisosRepository.save(permisosUpdate);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("message", "Registro actualizado exitosamente");
				
		return new ResponseEntity<Map<String,String>>(result,HttpStatus.OK);
	}
	
	//2.3 Traer todos los usuarios que tienen un permiso determinado respecto a un álbum específico
	@PostMapping(value="/users/permisos", produces = "application/json", consumes = "application/json")
	public ResponseEntity<List<Object>> getUsersByPermissions(@RequestBody Permisos permisos) {		
		
		List<Permisos> lstPermisos = permisosRepository.findByAlbumIdAndLecturaAndEscritura(permisos.getAlbumId(), permisos.isLectura(), permisos.isEscritura());
				
		RestTemplate restTemplate = new RestTemplate();
		
		String urlUsers;
		User user = new User();
		ArrayList<Object> allUsers = new ArrayList<Object>();		
		for (Permisos permiso : lstPermisos) {
			urlUsers =  Constants.API_ENDPOINT + "/users/" + permiso.getUserId();
			user = restTemplate.getForObject(urlUsers, User.class);
			
			allUsers.add(user);			
		}		
				
		return new ResponseEntity<List<Object>>(allUsers,HttpStatus.OK);
	}
	
	//2.4. Obtener un comentario con el nombre
	@GetMapping("/user/comment")
	public ResponseEntity<Object> getComment(@RequestParam("name") String name) {

		//Obtenemos los posts primero, ej:  https://jsonplaceholder.typicode.com/posts
		String urlPosts = Constants.API_ENDPOINT + "/posts";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Post[]> responsePosts = restTemplate.getForEntity(urlPosts, Post[].class);  
		Post[] posts = responsePosts.getBody();
		
		//Obtenemos los comentarios de cada post, ej:  https://jsonplaceholder.typicode.com/posts/1/comments
		String urlComments;
		ArrayList<Comment> allComments = new ArrayList<Comment>();
		for (int i = 0; i < 10; i++ ) {
			urlComments =  Constants.API_ENDPOINT + "/posts/" + posts[i].getId() + "/comments";
						
			ResponseEntity<Comment[]> responsePhotos = restTemplate.getForEntity(urlComments, Comment[].class);  
			Comment[] comments = responsePhotos.getBody();
			
			//Insertamos cada array de comentarios en la lista completa de comentarios
			for (Comment comment : comments) {				
				allComments.add(comment);
			}
		}
				
		Comment filteredComment = new Comment();
		for (Comment comment : allComments) {
			if(comment.getName().equalsIgnoreCase(name)) {
				filteredComment = comment;			
			}
		}
				
		return new ResponseEntity<Object>(filteredComment,HttpStatus.OK);
	}
	
	//2.4. Obtener todos los comentarios de un usuario
	@GetMapping("/user/comments")
	public ResponseEntity<ArrayList<Object>> getUserComments(@RequestParam("userId") String userId) {

		//Obtenemos los posts primero, ej:  https://jsonplaceholder.typicode.com/users/2/posts
		String urlPosts = Constants.API_ENDPOINT + "/users/" + userId + "/posts";
		
		RestTemplate restTemplate = new RestTemplate();        
		ResponseEntity<Post[]> responsePosts = restTemplate.getForEntity(urlPosts, Post[].class);  
		Post[] posts = responsePosts.getBody();
		
		//Obtenemos los comentarios de cada post, ej:  https://jsonplaceholder.typicode.com/posts/1/comments
		String urlComments;
		ArrayList<Object> allComments = new ArrayList<Object>();
		for (Post post: posts) {
			urlComments =  Constants.API_ENDPOINT + "/posts/" + post.getId() + "/comments";
						
			ResponseEntity<Comment[]> responsePhotos = restTemplate.getForEntity(urlComments, Comment[].class);  
			Comment[] comments = responsePhotos.getBody();
			
			//Insertamos cada array de comentarios en la lista completa de comentarios
			for (Comment comment : comments) {				
				allComments.add(comment);
			}
		}
		
		return new ResponseEntity<ArrayList<Object>>(allComments,HttpStatus.OK);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(WchallengeApplication.class, args);
	}
}
