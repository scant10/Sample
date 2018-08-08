package com.skcc.oms.example.domain.proxy;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.skcc.oms.example.domain.proxy.dto.ServicedeskInquiry;

@Service
public class ServicedeskProxy {
	@Autowired
	ServicedeskInquiryClient servicedeskInquiryClient;
	
	public ServicedeskInquiry findServicedeskInquiry(Long id) {
		return servicedeskInquiryClient.findServicedeskInquiry(id).getContent();
	}
	
	public Collection<ServicedeskInquiry> findAllServicedeskInquiries() {
		return servicedeskInquiryClient.findAllServicedeskInquiries().getContent();
	}
	
	public Collection<ServicedeskInquiry> findAllServicedeskInquiries(int size) {
		return servicedeskInquiryClient.findAllServicedeskInquiries(size).getContent();
	}
	
	@FeignClient(name="serviceDeskInquiry", url="${service-urls.oms-servicedesk}")
	interface ServicedeskInquiryClient {
		@GetMapping("ServiceDeskInquirys/{id}")
		Resource<ServicedeskInquiry> findServicedeskInquiry(@PathVariable("id") Long id);
		
		@GetMapping("ServiceDeskInquirys")
		Resources<ServicedeskInquiry> findAllServicedeskInquiries();
		
		@GetMapping("ServiceDeskInquirys")
		Resources<ServicedeskInquiry> findAllServicedeskInquiries(@RequestParam("size") int size);
	}
}
