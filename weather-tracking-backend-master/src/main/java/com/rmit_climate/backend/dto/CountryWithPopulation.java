package com.rmit_climate.backend.dto;

import com.rmit_climate.backend.domain.Country;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CountryWithPopulation {
  Country country;
  Long amount;
}
