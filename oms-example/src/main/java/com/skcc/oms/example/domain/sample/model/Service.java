package com.skcc.oms.example.domain.sample.model;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

import com.sk.cnaps.domain.model.AbstractEntity;
import com.sk.cnaps.domain.model.AggregateRoot;
import com.sk.cnaps.domain.model.IdValue;

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
public class Service extends AbstractEntity implements AggregateRoot {
	private String name;
	private String startDate;
	private String finishDate;
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private ServiceDesc serviceDesc;
	
	@Embedded
	@AttributeOverride(name="id", column=@Column(name="business_id"))
	private IdValue<Business> business;
	
	@Enumerated(EnumType.STRING)
	private ServiceLevelType serviceLevelType;
	
	@Enumerated(EnumType.STRING)
	private ServiceBoundaryType serviceBoundaryType;
}
