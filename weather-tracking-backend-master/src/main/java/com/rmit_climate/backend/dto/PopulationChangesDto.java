package com.rmit_climate.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PopulationChangesDto {
  private Long startAmount;
  private Long endAmount;
  private BigDecimal percentageChange;
}
