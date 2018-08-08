package com.skcc.oms.example.domain.sample.model;

import java.util.List;

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
public class BusinessDetail implements JsonValue {
	private String goal;
	private List<String> procedures;
}
