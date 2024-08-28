package com.rmit_climate.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TemperatureCompareResponseDto extends TemperatureCompareDto {
  Double averageTemp;
}
