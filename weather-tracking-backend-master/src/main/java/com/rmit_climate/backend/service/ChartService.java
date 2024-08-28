package com.rmit_climate.backend.service;

import com.rmit_climate.backend.dto.*;
import com.rmit_climate.backend.mapper.ChartMapper;
import com.rmit_climate.backend.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Repository
public class ChartService {

    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;
    private final TemperatureRepository temperatureRepository;
    private final PopulationRepository populationRepository;
    private final ChartMapper chartMapper;

    @PersistenceContext
    private final EntityManager entityManager;
}
