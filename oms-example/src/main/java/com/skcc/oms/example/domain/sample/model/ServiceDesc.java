package com.skcc.oms.example.domain.sample.model;

import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;

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
public class ServiceDesc extends AbstractEntity {
	private String goal;
	private String targetUser;
	private String description;
}
