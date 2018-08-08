package com.skcc.oms.example.domain.proxy.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class ServicedeskInquiry {
	private Date acceptDateTime;
	
	private String businessUnitId;
	private String businessUnitName;
	private String companyId;
	private String companyName;
	private String incidentNumber;
	private String inquiryDetailContent;
	private String inquiryMeanscode;
	private String inquiryProgressCode;
	private String inquiryTitle;
	
	private Boolean kmSttsYn;
	private Boolean overlapTroubleYn;
	
	private Boolean sq1ProcessPossibleYn;

	private IncidentStatus statusCode;

    private TransferType transferType;
	
	private Boolean troublePossibleYn;
	
	private Requester requester;
	
}
