package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.Country;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {

  @Query(value = "SELECT * from Country ORDER BY :nameAndDirection", nativeQuery = true)
  List<Country> findAllAndSortBy(String nameAndDirection);
}
