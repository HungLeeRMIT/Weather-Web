package com.rmit_climate.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Setter
@NoArgsConstructor
public class TemperatureChangesDto {
  private Double startAmount;
  private Double endAmount;
  private Double percentageChange;

  private Double startAmountMin;
  private Double endAmountMin;
  private Double percentageChangeMin;

  private Double startAmountMax;
  private Double endAmountMax;
  private Double percentageChangeMax;
}
