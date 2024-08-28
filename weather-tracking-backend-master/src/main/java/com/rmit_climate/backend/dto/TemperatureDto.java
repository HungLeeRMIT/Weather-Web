package com.rmit_climate.backend.dto;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class TemperatureDto {
    long year;
    private Double averageTemp;
    private Double minTemp;
    private Double maxTemp;

    public TemperatureDto(Double averageTemp, Double minTemp, Double maxTemp) {
        this.averageTemp = averageTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }

    public TemperatureDto(Long year, Double averageTemp, Double minTemp, Double maxTemp) {
        this.year = year;
        this.averageTemp = averageTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }
}
