package com.skcc.oms.example.domain.sample.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.sk.cnaps.domain.repository.IdValueRepository;
import com.skcc.oms.example.domain.sample.model.Business;

public interface BusinessRepository extends PagingAndSortingRepository<Business, Long>,
											IdValueRepository<Business> {	
	
	List<Business> findByName(@Param("name") String name);
	Page<Business> findByNameLike(@Param("name") String name, Pageable pagable);
	Page<Business> findByNameOrDescription(@Param("name") String name, @Param("description") String description, Pageable pageable);

	@Query(value = "SELECT * FROM business b INNER JOIN sub_business sb on b.id=sb.business_id WHERE sb.name = :name", nativeQuery = true)
	List<Business> findBySubBusinessName(@Param("name") String name);
}
