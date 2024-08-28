package com.rmit_climate.backend.mapper;

import com.rmit_climate.backend.dto.ChartData;
import com.rmit_climate.backend.dto.TemperatureDto;
import org.springframework.stereotype.Component;

@Component
public class ChartMapper {
    public ChartData mapToChartData(TemperatureDto temperatureDto, long pop) {
        return ChartData.builder()
                .year(temperatureDto.getYear())
                .population(pop)
                .temperatures(temperatureDto)
                .build();
    }
}
