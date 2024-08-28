package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.City;
import com.rmit_climate.backend.domain.State;
import com.rmit_climate.backend.dto.CityWithoutCountry;
import com.rmit_climate.backend.dto.StateWithoutCountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    @Query("SELECT c.name as name," +
            " c.id as id," +
            " c.latitude as latitude," +
            " c.longitude as longitude" +
            " FROM City c " +
            "WHERE c.country.countryCode = :countryCode")
    List<CityWithoutCountry> findAllByCountryCode(String countryCode);
}
