package com.rmit_climate.backend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "city", indexes = {@Index(name = "idx_city_name", columnList = "name")})
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_code", nullable = false)
    private Country country;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;
}