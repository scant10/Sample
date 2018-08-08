package com.skcc.oms.example.domain.sample.model;

import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.sk.cnaps.domain.model.AbstractEntity;
import com.sk.cnaps.domain.model.AggregateRoot;
import com.sk.cnaps.domain.util.ListConverter;

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
public class Business extends AbstractEntity implements AggregateRoot {
	private String name;
	private String description;
	
	@Embedded
	@AttributeOverride(name="name", column=@Column(name="manager_name"))
	private Manager manager;
	
	@ElementCollection(fetch=FetchType.EAGER)
	private List<Contact> contacts;
	
	@Convert(converter=BusinessDetail.class)
	@Column(length=4000)
	private BusinessDetail businessDetail;
	
	@Convert(converter=ListConverter.class)
	@Column(length=4000)
	private List<Worker> workers;
	
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JoinColumn(name="business_id")
	private List<SubBusiness> subBusinesses;
}
