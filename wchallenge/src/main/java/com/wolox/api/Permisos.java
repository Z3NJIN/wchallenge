package com.wolox.api;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PERMISOS", schema = "dbo")
public class Permisos implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	
	@Column(name = "USER_ID", nullable=false)
	private Integer userId;
	
	@Column(name = "ALBUM_ID", nullable=false)
	private Integer albumId;
	
	@Column(name = "LECTURA", nullable=false)
	private boolean lectura;
	
	@Column(name = "ESCRITURA", nullable=false)
	private boolean escritura;

	protected Permisos() {
	}

	public Permisos(Integer userId, Integer albumId, boolean lectura, boolean escritura) {
		super();
		this.userId = userId;
		this.albumId = albumId;
		this.lectura = lectura;
		this.escritura = escritura;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getAlbumId() {
		return albumId;
	}

	public void setAlbumId(Integer albumId) {
		this.albumId = albumId;
	}

	public boolean isLectura() {
		return lectura;
	}

	public void setLectura(boolean lectura) {
		this.lectura = lectura;
	}

	public boolean isEscritura() {
		return escritura;
	}

	public void setEscritura(boolean escritura) {
		this.escritura = escritura;
	}

	@Override
	public String toString() {
		return "Permisos [userId=" + userId + ", albumId=" + albumId + ", lectura=" + lectura + ", escritura="
				+ escritura + "]";
	}

}