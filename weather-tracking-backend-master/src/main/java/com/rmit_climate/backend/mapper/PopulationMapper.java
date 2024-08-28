package com.rmit_climate.backend.mapper;

import com.rmit_climate.backend.domain.Population;
import com.rmit_climate.backend.dto.PopulationWithoutCountry;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
public class PopulationMapper {

    public PopulationWithoutCountry mapToPopulationWithoutCountry(Population population) {
        return PopulationWithoutCountry
                .builder()
                .id(population.getId())
                .amount(population.getAmount())
                .year(population.getYear())
                .build();
    }
}
