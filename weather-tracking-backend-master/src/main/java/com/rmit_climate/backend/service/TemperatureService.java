package com.rmit_climate.backend.service;

import com.rmit_climate.backend.dto.PopulationChangesDto;
import com.rmit_climate.backend.dto.TemperatureChangesDto;
import com.rmit_climate.backend.dto.TemperatureCompareDto;
import com.rmit_climate.backend.dto.TemperatureDto;
import com.rmit_climate.backend.mapper.ChartMapper;
import com.rmit_climate.backend.repository.CityRepository;
import com.rmit_climate.backend.repository.CountryRepository;
import com.rmit_climate.backend.repository.PopulationRepository;
import com.rmit_climate.backend.repository.StateRepository;
import com.rmit_climate.backend.repository.TemperatureRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Repository
@Log4j2
public class TemperatureService {

  private final CountryRepository countryRepository;
  private final CityRepository cityRepository;
  private final StateRepository stateRepository;
  private final TemperatureRepository temperatureRepository;
  private final PopulationRepository populationRepository;
  private final ChartMapper chartMapper;

  @PersistenceContext
  private final EntityManager entityManager;

  public TemperatureChangesDto yearChanges(String countryCode, Integer startDate, Integer endDate) {
    TemperatureChangesDto percentageChange = convertToChangesDtoList(
        temperatureRepository.getPercentageChangeCountry(
            countryCode, startDate, endDate).get(0));
    return percentageChange;
  }

  public List<TemperatureDto> getGlobalTemp() {
    return convertToTemperatureDtoList(temperatureRepository.getGlobalTemp());
  }

  public List<TemperatureDto> convertToTemperatureDtoList(List<Object[]> resultList) {
    List<TemperatureDto> changesDtoList = new ArrayList<>();

    for (Object[] row : resultList) {
      Integer year = (Integer) row[0];
      Double averageTemp = (Double) row[1];
      Double minTemp = (Double) row[2];
      Double maxTemp = (Double) row[3];

      TemperatureDto changesDto = TemperatureDto.builder()
          .averageTemp(averageTemp)
          .maxTemp(maxTemp)
          .minTemp(minTemp)
          .year(year)
          .build();

      changesDtoList.add(changesDto);
    }

    return changesDtoList;
  }

  private TemperatureChangesDto convertToChangesDtoList(Object[] row) {

    Double endAmount = (Double) row[0];
    Double startAmount = (Double) row[1];

    Double startAmountMin = (Double) row[2];
    Double startAmountMax = (Double) row[3];

    Double endAmountMin = (Double) row[4];
    Double endAmountMax = (Double) row[5];

    Double percentageChange = (Double) row[6];
    Double percentageChangeMin = (Double) row[7];
    Double percentageChangeMax = (Double) row[8];

    TemperatureChangesDto changes = new TemperatureChangesDto();
    changes.setStartAmount(startAmount);
    changes.setEndAmount(endAmount);
    changes.setStartAmountMin(startAmountMin);
    changes.setStartAmountMax(startAmountMax);
    changes.setEndAmountMin(endAmountMin);
    changes.setEndAmountMax(endAmountMax);
    changes.setPercentageChange(percentageChange);
    changes.setPercentageChangeMin(percentageChangeMin);
    changes.setPercentageChangeMax(percentageChangeMax);

    return changes;
  }

  public List<TemperatureDto> getCountryTemperature(
      String countryCode, Optional<Integer> stateId, Optional<Integer> cityId) {
    if (stateId.isPresent()) {
      return convertToTemperatureDtoList(
          temperatureRepository.getCountryState(countryCode, stateId.orElse(null)));
    }

    if (cityId.isPresent()) {
      return convertToTemperatureDtoList(
          temperatureRepository.getCountryState(countryCode, cityId.orElse(null)));
    }

    return convertToTemperatureDtoList(temperatureRepository.getCountry(countryCode));
  }

  public List<TemperatureDto> compareMany(List<TemperatureCompareDto> request) {
    return null;
  }
}

