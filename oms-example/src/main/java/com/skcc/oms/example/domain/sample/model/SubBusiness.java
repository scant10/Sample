package com.skcc.oms.example.domain.sample.model;

import javax.persistence.Entity;

import com.sk.cnaps.domain.model.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
public class SubBusiness extends AbstractEntity {
	private String name;
	private String description;
}
