package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.Population;
import com.rmit_climate.backend.dto.MaxDataRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PopulationRepository extends JpaRepository<Population, Integer> {


    @Query("FROM Population WHERE country.countryCode = :countryCode")
    List<Population> getCountryPopulation(String countryCode);

    @Query("FROM Population WHERE country.countryCode IS NULL")
    List<Population> getGlobalPopulation();

    @Query("SELECT MIN(year) AS min, MAX(year) AS max FROM Population")
    MaxDataRange getDataRange();

    @Query(value = "SELECT p2.amount, p1.amount, " +
        "(((CAST(p2.amount AS numeric) - p1.amount) / p1.amount) * 100) AS percentage_change " +
        "FROM population p1 " +
        "JOIN population p2 ON p1.country_code = p2.country_code " +
        "WHERE p1.year = :start " +
        "AND p2.year = :end " +
        "AND p1.country_code = :countryCode LIMIT 1", nativeQuery = true)
    List<Object[]> getPercentageChange(@Param("countryCode") String countryCode,
        @Param("start") int start,
        @Param("end") int end);
}
