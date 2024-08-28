package com.rmit_climate.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "population")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Population {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    // Assuming you have a Country entity
    @ManyToOne
    @JoinColumn(name = "country_code", nullable = false)
    private Country country;

    @Column(name = "amount", nullable = true)
    private Long amount;

    @Column(name = "year")
    private Integer year;


}
