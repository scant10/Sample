package com.skcc.oms.example.domain.sample.model;

import javax.persistence.Embeddable;

import com.sk.cnaps.domain.model.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode

@Embeddable
public class Contact implements JsonValue {
	private String ownerName;
	private String telNo;
	private String email;	
}