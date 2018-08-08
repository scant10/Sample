package com.skcc.oms.example.domain.sample.model;

public enum ServiceBoundaryType {
	INTERNAL("내부"),
	EXTERNAL("외부");
	
	private String text;
	
	ServiceBoundaryType(String text) {
		this.text = text;
	}
	
	public String text() {
		return text;
	}
}
