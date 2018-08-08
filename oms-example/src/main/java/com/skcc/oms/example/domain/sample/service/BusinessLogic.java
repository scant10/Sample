package com.skcc.oms.example.domain.sample.service;

import org.springframework.stereotype.Service;

@Service
public class BusinessLogic implements BusinessService {

	@Override
	public void updateBusiness(Long id) {
		System.out.println("UPDATED: " + id);
	}
}
