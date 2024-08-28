package com.rmit_climate.backend.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "country")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class Country {
    @Id
    @Column(name = "country_code", nullable = false, unique = true)
    private String countryCode;

    private String name;
}
