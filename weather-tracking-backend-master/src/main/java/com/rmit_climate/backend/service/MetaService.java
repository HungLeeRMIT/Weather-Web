package com.rmit_climate.backend.service;

import com.rmit_climate.backend.domain.Country;
import com.rmit_climate.backend.dto.CompareYearRequestDto;
import com.rmit_climate.backend.dto.CompareYearResponseDto;
import com.rmit_climate.backend.dto.DataPointMeta;
import com.rmit_climate.backend.dto.MaxDataRange;
import com.rmit_climate.backend.dto.TeamMember;
import com.rmit_climate.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetaService {

    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;
    private final TemperatureRepository temperatureRepository;
    private final PopulationRepository populationRepository;
    private final MetaRepository metaRepository;

    public DataPointMeta getMeta() {
        long totalCountry = countryRepository.count();
        long totalCity = cityRepository.count();
        long totalState = stateRepository.count();
        long totalGlobalTemperaturePoint = temperatureRepository.countAllGlobalTemperaturePoint();
        long totalCountryTemperaturePoint = temperatureRepository.countAllCountryTemperaturePoint();
        long totalCityTemperaturePoint = temperatureRepository.countAllCityTemperaturePoint();
        long totalStateTemperaturePoint = temperatureRepository.countAllStateTemperaturePoint();
        long populationCount = populationRepository.count();
        MaxDataRange temperatureDataRange = temperatureRepository.getDataRange();

        return DataPointMeta
                .builder()
                .totalGlobalTemperatureDataPoint(totalGlobalTemperaturePoint)
                .totalGlobalTemperatureDataPoint(populationCount)
                .totalCountryDataPoint(totalCountryTemperaturePoint)
                .totalCityDataPoint(totalCityTemperaturePoint)
                .totalStateDataPoint(totalStateTemperaturePoint)
                .minYear(temperatureDataRange.getMin())
                .maxYear(temperatureDataRange.getMax())
                .totalCountry(totalCountry)
                .totalCity(totalCity)
                .totalState(totalState)
                .build();
    }

    public CompareYearResponseDto compareYear(CompareYearRequestDto request) {
        return temperatureRepository
                .getTemperatureChanges(
                        request.getStartYear(),
                        request.getEndYear(),
                        request.getCountryCode());
    }

    public List<TeamMember> getTeamMember() {
        return metaRepository.findAllByTypeTeamMember();
    }
}
