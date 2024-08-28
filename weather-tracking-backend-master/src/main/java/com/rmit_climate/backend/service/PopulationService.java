package com.rmit_climate.backend.service;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.dto.CountryWithPopulation;
import com.rmit_climate.backend.dto.PopulationChangesDto;
import com.rmit_climate.backend.dto.MaxDataRange;
import com.rmit_climate.backend.dto.PopulationWithoutCountry;
import com.rmit_climate.backend.mapper.PopulationMapper;

import com.rmit_climate.backend.repository.PopulationRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PopulationService {

  private final PopulationRepository populationRepository;

  private final PopulationMapper populationMapper;

  @PersistenceContext
  private EntityManager entityManager;

  public List<PopulationWithoutCountry> getCountryPopulation(
      String countryCode) {

    return populationRepository.getCountryPopulation(countryCode).stream()
        .map(populationMapper::mapToPopulationWithoutCountry).toList();
  }

  public MaxDataRange dataRange() {
    return populationRepository.getDataRange();
  }

  public PopulationChangesDto yearChanges(String countryCode, Integer startDate, Integer endDate) {
    PopulationChangesDto percentageChange = convertToChangesDtoList(
        populationRepository.getPercentageChange(countryCode, startDate, endDate).get(0));
    return percentageChange;
  }

  private PopulationChangesDto convertToChangesDtoList(Object[] row) {
    Long endAmount = (Long) row[0];
    Long startAmount = (Long) row[1];

    BigDecimal percentageChange = (BigDecimal) row[2];

    PopulationChangesDto populationChangesDto = new PopulationChangesDto();
    populationChangesDto.setStartAmount(startAmount);
    populationChangesDto.setEndAmount(endAmount);
    populationChangesDto.setPercentageChange(percentageChange);

    return populationChangesDto;
  }

  public List<CountryWithPopulation> countryRank() {

    String queryString =
        "SELECT c.country_code AS country_code, c.name, p.amount from country c JOIN population p\n"
            + "    on c.country_code = p.country_code\n" + "         AND p.year = '2013'\n"
            + "ORDER BY p.amount DESC";

    List<?> resultList = entityManager.createNativeQuery(queryString).getResultList();
    List<CountryWithPopulation> list = resultList.stream().map(r -> convertToCountryWithPopulation((Object[]) r)).toList();

    return list;
  }

  private CountryWithPopulation convertToCountryWithPopulation(Object[] row) {
    String countryCode = (String) row[0];
    String name = (String) row[1];
    Long amount = (Long) row[2];

    CountryWithPopulation countryWithPopulation = CountryWithPopulation.builder()
        .country(Country.builder().countryCode(countryCode).name(name).build()).amount(amount)
        .build();

    return countryWithPopulation;
  }
}
