package com.skcc.oms.example.domain.sample.model;

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
public class Worker implements JsonValue {
	private String name;
	private String department;
}
