package com.rmit_climate.backend.controller;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.domain.State;
import com.rmit_climate.backend.dto.CityWithoutCountry;
import com.rmit_climate.backend.dto.StateWithoutCountry;
import com.rmit_climate.backend.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("country")
@RequiredArgsConstructor
public class CountryController {

  private final CountryService countryService;

  @GetMapping("")
  public ResponseEntity<List<Country>> list(
      @RequestParam(required = false, defaultValue = "") Optional<String> type,
      @RequestParam(required = false, defaultValue = "") Optional<String> direction
  ) {
    return ResponseEntity.ok(countryService.getCountries(type, direction));
  }

  @GetMapping("states")
  public ResponseEntity<List<StateWithoutCountry>> listState(@RequestParam String countryCode) {
    return ResponseEntity.ok(countryService.getCountryStates(countryCode));
  }

  @GetMapping("cities")
  public ResponseEntity<List<CityWithoutCountry>> listCity(@RequestParam String countryCode) {
    return ResponseEntity.ok(countryService.getCountryCities(countryCode));
  }
}
