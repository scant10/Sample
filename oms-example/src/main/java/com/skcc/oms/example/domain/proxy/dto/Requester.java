package com.skcc.oms.example.domain.proxy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
@ToString
public class Requester {
	private String businessUnitId;
	private String businessUnitName;
	private String companyId;
	private String companyName;
	private String departmentId;
	private String departmentName;
	private String emailAddress;
	private String ipAddress;
	private String officialPosition;
	private String requesterEno;
	private String requesterId;
	private String requesterName;
	private String responsibiliteisOfOffice;
	private String swingId;
	private String personalCustomer2Name;
	
}
