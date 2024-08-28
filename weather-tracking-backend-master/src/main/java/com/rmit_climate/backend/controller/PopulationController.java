package com.rmit_climate.backend.controller;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.dto.PopulationRequestDto;
import com.rmit_climate.backend.service.CountryService;
import com.rmit_climate.backend.service.PopulationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("population")
@RequiredArgsConstructor
public class PopulationController {

  private final PopulationService populationService;

  @GetMapping()
  public ResponseEntity<List<?>> listPopulation(@RequestParam String countryCode) {
    return ResponseEntity.ok(populationService.getCountryPopulation(countryCode));
  }

  @GetMapping("/year-changes/{countryCode}")
  public ResponseEntity<?> yearChanges(
      @PathVariable String countryCode,
      @RequestParam(name = "startDate", defaultValue = "") Integer startDate,
      @RequestParam(name = "endDate", defaultValue = "") Integer endDate
  ) {
    return ResponseEntity.ok(populationService.yearChanges(countryCode, startDate, endDate));
  }

  @GetMapping("/country-rank")
  public ResponseEntity<?> countryRank(
  ) {
    return ResponseEntity.ok(populationService.countryRank());
  }

  @GetMapping("/year-range")
  public ResponseEntity<?> dataRange() {
    return ResponseEntity.ok(populationService.dataRange());
  }
}
