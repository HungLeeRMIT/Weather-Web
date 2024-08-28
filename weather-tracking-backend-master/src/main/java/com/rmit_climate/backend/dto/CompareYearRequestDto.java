package com.rmit_climate.backend.dto;

import lombok.Data;

@Data
public class CompareYearRequestDto {
    int startYear;
    int endYear;
    String countryCode;
}
