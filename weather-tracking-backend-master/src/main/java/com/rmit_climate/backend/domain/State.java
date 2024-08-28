package com.rmit_climate.backend.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "state")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_code", nullable = false)
    private Country country;
}