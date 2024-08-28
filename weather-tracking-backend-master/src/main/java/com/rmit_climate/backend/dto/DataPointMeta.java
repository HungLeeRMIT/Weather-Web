package com.rmit_climate.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DataPointMeta {
    long totalGlobalTemperatureDataPoint;
    long totalGlobalPopulationDataPoint;
    long totalCountryDataPoint;
    long totalCityDataPoint;
    long totalStateDataPoint;
    long totalCountry;
    long totalState;
    long totalCity;
    long minYear;
    long maxYear;
}
