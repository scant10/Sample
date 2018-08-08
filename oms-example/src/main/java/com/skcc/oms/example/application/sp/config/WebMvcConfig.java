package com.skcc.oms.example.application.sp.config;

import java.lang.reflect.Method;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.WebMvcRegistrationsAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
	private static @Value("${spring.data.rest.base-path}") String springDataRestBasePath;
	@Bean
	public ReloadableResourceBundleMessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:label/messages");
		return messageSource;
	}

	@Bean
	public LocaleResolver localeResolver() {
		SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
		sessionLocaleResolver.setDefaultLocale(Locale.KOREA);
		return sessionLocaleResolver;
	}
	
	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		return localeChangeInterceptor;
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
		registry.addResourceHandler("/swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
	}
	
	@Bean
	public WebMvcRegistrationsAdapter webMvcRegistrationsHandlerMapping() {
		return new WebMvcRegistrationsAdapter() {
			@Override
			public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
				return new RequestMappingHandlerMapping() {
					private @Value("${spring.data.rest.base-path}") String API_BASE_PATH; 
					@Override
					protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
						Class<?> beanType = method.getDeclaringClass();
						if (AnnotationUtils.findAnnotation(beanType, RestController.class) != null) {
							System.out.println(mapping.getName());
							PatternsRequestCondition apiPattern = new PatternsRequestCondition(API_BASE_PATH)
									.combine(mapping.getPatternsCondition());
							mapping = new RequestMappingInfo(mapping.getName(), apiPattern,
									mapping.getMethodsCondition(), mapping.getParamsCondition(),
									mapping.getHeadersCondition(), mapping.getConsumesCondition(),
									mapping.getProducesCondition(), mapping.getCustomCondition());
						}
						super.registerHandlerMethod(handler, method, mapping);
					}
				};
			}
		};
	}
}
