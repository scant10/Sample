package com.skcc.oms.example.application.sp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.skcc.oms.example.domain.sample.service.BusinessService;

@RepositoryRestController
@RequestMapping("businesses")
public class BusinessRestController {
	@Autowired
	private BusinessService businessService;

	
	@PutMapping("{id}")
	public ResponseEntity<?> updateBusiness(@PathVariable("id") Long id) {
		businessService.updateBusiness(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findOneBusiness(@PathVariable("id") Long id) {
		System.out.println("TEST");
		return ResponseEntity.ok().build();
	}
}
