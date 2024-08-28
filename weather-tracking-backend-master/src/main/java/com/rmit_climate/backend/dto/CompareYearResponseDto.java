package com.rmit_climate.backend.dto;

import lombok.Data;

@Data
public class CompareYearResponseDto {
    TemperatureDto diff;
    TemperatureDto percentageChangeSinceStart;

    public CompareYearResponseDto(TemperatureDto diff, TemperatureDto percentageChangeSinceStart) {
        this.diff = diff;
        this.percentageChangeSinceStart = percentageChangeSinceStart;
    }
}
