package com.skcc.oms.example.domain.sample.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.sk.cnaps.domain.model.IdValue;
import com.skcc.oms.example.domain.proxy.ServicedeskProxy;
import com.skcc.oms.example.domain.proxy.dto.ServicedeskInquiry;
import com.skcc.oms.example.domain.sample.model.Business;
import com.skcc.oms.example.domain.sample.model.Service;
import com.skcc.oms.example.domain.sample.repository.BusinessRepository;
import com.skcc.oms.example.domain.sample.repository.ServiceRepository;

@org.springframework.stereotype.Service
public class SampleLogic implements SampleService {
	@Autowired
	private BusinessRepository businessRepository;
	
	@Autowired
	private ServiceRepository serviceRepository;
	
	@Autowired 
	private ServicedeskProxy sevicedeskProxy;

	@Override
	@Transactional
	public void doSomethingManyAggregates() {
		Business business = registerBusiness("TEST");
		Service service = registerService(business.getId());
		System.err.println(service.toString());	
		service.getBusiness().setValue(business);
		System.err.println(service.toString());	
	}
	
	private Business registerBusiness(String name) {
		return businessRepository.save(Business.builder().name(name).description(name + " description").build());
	}
	
	private Service registerService(Long businessId) {
		return serviceRepository.save(Service.builder().name("test").business(new IdValue<Business>(businessId)).build());
	}
	
	@Override
	public void doSomethingUsingServicedesk() {
		System.err.println("3:\n" + sevicedeskProxy.findServicedeskInquiry(3L).toString());
		
		Collection<ServicedeskInquiry> servicedeskInquiries = sevicedeskProxy.findAllServicedeskInquiries();
		System.err.println("4:\n" + servicedeskInquiries.toString());
		
		Collection<ServicedeskInquiry> servicedeskInquiries2 = sevicedeskProxy.findAllServicedeskInquiries(2);
		System.err.println("5:\n" + servicedeskInquiries2.toString());
	}
}
