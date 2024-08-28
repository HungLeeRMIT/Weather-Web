package com.rmit_climate.backend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "temperature", indexes = {
        @Index(name = "idx_temperature_year", columnList = "year"),
        @Index(name = "idx_temperature_country", columnList = "country_code"),
        @Index(name = "idx_temperature_state", columnList = "country_code, state_id"),
        @Index(name = "idx_temperature_city", columnList = "country_code, city_id")
})
public class Temperature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "average_temp")
    private Double averageTemp;

    @Column(name = "max_temp")
    private Double maxTemp;

    @Column(name = "min_temp")
    private Double minTemp;

    @Column(name = "land_ocean_average_temperature")
    private Double landOceanAverageTemperature;

    @Column(name = "land_ocean_max_temperature")
    private Double landOceanMinimumTemperature;

    @Column(name = "land_ocean_min_temperature")
    private Double landOceanMaximumTemperature;

    @ManyToOne
    @JoinColumn(name = "country_code")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
}
