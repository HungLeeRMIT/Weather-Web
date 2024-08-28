package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.domain.State;
import com.rmit_climate.backend.dto.StateWithoutCountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<State, Integer> {

    @Query("SELECT s.name as name, s.id as id FROM State s WHERE s.country.countryCode = :countryCode")
    List<StateWithoutCountry> findAllByCountryCode(String countryCode);
}
