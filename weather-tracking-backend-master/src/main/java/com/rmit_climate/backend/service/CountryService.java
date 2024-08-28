package com.rmit_climate.backend.service;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.domain.State;
import com.rmit_climate.backend.dto.CityWithoutCountry;
import com.rmit_climate.backend.dto.DataPointMeta;
import com.rmit_climate.backend.dto.StateWithoutCountry;
import com.rmit_climate.backend.mapper.CountryMapper;
import com.rmit_climate.backend.repository.CityRepository;
import com.rmit_climate.backend.repository.CountryRepository;
import com.rmit_climate.backend.repository.StateRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {

  private final CountryRepository countryRepository;
  private final StateRepository stateRepository;
  private final CityRepository cityRepository;
  private final CountryMapper countryMapper;

  @PersistenceContext
  private EntityManager entityManager;

  public long getCountryCount() {
    return countryRepository.count();
  }

  public List<Country> getCountries(Optional<String> type, Optional<String> direction) {
    Direction sqlDirection = null;
    String queryString = null;

    if (direction.isPresent()) {
      sqlDirection = switch (direction.get()) {
        case "asc" -> Direction.ASC;
        default -> Direction.DESC;
      };
    }


    if (type.isPresent()) {
      switch (type.get()) {
        case "temperature":
          queryString = "SELECT c.country_code, c.name from country c JOIN temperature t\n"
              + "                             on c.country_code = t.country_code\n"
              + "                                    and t.city_id IS NULL\n"
              + "                                    and t.state_id IS NULL\n"
              + "                                 AND t.year = '2013'\n"
              + "ORDER BY t.average_temp " + sqlDirection;

          break;

        case "population":
          queryString = "SELECT c.country_code AS country_code, c.name from country c JOIN population p\n"
              + "    on c.country_code = p.country_code\n"
              + "         AND p.year = '2013'\n"
              + "ORDER BY p.amount " + sqlDirection;

              break;
        default:
        case "name":
          queryString = "SELECT country_code, name FROM country ORDER BY " + "name " + sqlDirection;
          break;


      };
    }

    List resultList = entityManager.createNativeQuery(queryString, Country.class)
        .getResultList();

    return resultList;
  }

  public List<StateWithoutCountry> getCountryStates(String countryCode) {
    return stateRepository.findAllByCountryCode(countryCode);
  }

  public List<CityWithoutCountry> getCountryCities(String countryCode) {
    return cityRepository.findAllByCountryCode(countryCode);
  }
}
