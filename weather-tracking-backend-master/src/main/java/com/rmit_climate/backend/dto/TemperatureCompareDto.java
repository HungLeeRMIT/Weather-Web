package com.rmit_climate.backend.dto;

import lombok.Data;

@Data
public class TemperatureCompareDto {
  int startYear;
  int endYear;
  String locationType;
  String countryCode;
  String stateId;
  String city;
}
