package com.skcc.oms.example.application.sp.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class BaseController {
	private static final Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	@RequestMapping(value= {"", "/index"})
	public String defaultRequestMapping() {
		logger.info("root index redirect to sample index!!!");
		return "index";
	}
	
	@RequestMapping("/{viewId:(!swagger-ui\\.html)$}")
	public String defaultRequestMapping(@PathVariable String viewId) {
		logger.info("uri = {}", viewId);
		return viewId;
	}
	
	@RequestMapping("/{path:(?!static|webjars).*$}/{viewId}")
	public String depth1RequestMapping(@PathVariable("path") String path, @PathVariable("viewId") String viewId) {
		logger.info("uri = {}/{}", path, viewId);
		return path + "/" + viewId;
	}
	
	@RequestMapping("/{path1:(?!static|webjars).*$}/{path2}/{viewId}")
	public String depth2RequestMapping(@PathVariable("path1") String path1, @PathVariable("path2") String path2, @PathVariable("viewId") String viewId) {
		logger.info("uri = {}/{}/{}", path1, path2, viewId);
		return path1 + "/" + path2 + "/" + viewId;
	}
}
