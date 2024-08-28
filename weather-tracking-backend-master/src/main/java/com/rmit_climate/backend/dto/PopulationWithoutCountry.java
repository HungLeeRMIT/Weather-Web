package com.rmit_climate.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PopulationWithoutCountry {
    long id;
    int year;
    long amount;
}
