package com.skcc.oms.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.hateoas.config.EnableHypermediaSupport;

import com.sk.cnaps.application.sp.web.EnumTypeRestController;
import com.skcc.oms.example.domain.sample.service.SampleLogic;

import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;

@Import({SpringDataRestConfiguration.class, EnumTypeRestController.class})
//@ComponentScan({"com.sk.cnaps", "springfox"})
@SpringBootApplication
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
@EnableFeignClients
public class OmsExampleApplication {
	public static void main(String[] args) {
		SpringApplication.run(OmsExampleApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner test(SampleLogic sampleLogic) {
		return (args) -> {
			sampleLogic.doSomethingManyAggregates();
			
			//sampleLogic.doSomethingUsingServicedesk();
		};
	}
	
	//@Bean
//	public EnumTypeRestController createEnumTypeRestController() {
//		return new EnumTypeRestController();
//	}
}
