package com.rmit_climate.backend.controller;

import com.rmit_climate.backend.dto.CompareYearRequestDto;
import com.rmit_climate.backend.dto.CompareYearResponseDto;
import com.rmit_climate.backend.dto.TemperatureCompareDto;
import com.rmit_climate.backend.dto.TemperatureDto;
import com.rmit_climate.backend.service.TemperatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("temperature")
@RequiredArgsConstructor
public class TemperatureController {

  final TemperatureService temperatureService;

  @GetMapping("/year-changes/{countryCode}")
  public ResponseEntity<?> yearChanges(
      @PathVariable String countryCode,
      @RequestParam(name = "startDate", defaultValue = "") Integer startDate,
      @RequestParam(name = "endDate", defaultValue = "") Integer endDate
  ) {
    return ResponseEntity.ok(temperatureService.yearChanges(countryCode, startDate, endDate));
  }

  @GetMapping("{countryCode}")
  public ResponseEntity<?> getCountryTemperature(
      @PathVariable String countryCode,
      @RequestParam(name = "stateId") Optional<Integer> stateId,
      @RequestParam(name = "cityId") Optional<Integer> cityId
  ) {
    if (stateId.isPresent() && cityId.isPresent()) {
      return ResponseEntity.badRequest().body("Can't filter by both state and city");
    }
    return ResponseEntity.ok(
        temperatureService.getCountryTemperature(countryCode, stateId,
            cityId));
  }

  @GetMapping("")
  public ResponseEntity<List<TemperatureDto>> getGlobalTemp(
  ) {
    return ResponseEntity.ok(temperatureService.getGlobalTemp());
  }


  @PostMapping("compare-many")
  public ResponseEntity<List<TemperatureDto>> compareMany(
      @RequestBody List<TemperatureCompareDto> request
  ) {
    return ResponseEntity.ok(temperatureService.compareMany(request));
  }
}
