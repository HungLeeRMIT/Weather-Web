package com.rmit_climate.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.rmit_climate.backend.domain.Temperature;
import jakarta.persistence.Embedded;
import jakarta.persistence.EntityResult;
import jakarta.persistence.FieldResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
@SqlResultSetMapping(
    name = "ChartDataMapping",
    entities = {
        @EntityResult(
            entityClass = ChartData.class,
            fields = {
                @FieldResult(name = "year", column = "year"),
                @FieldResult(name = "temperatures.year", column = "tempYear"),
                @FieldResult(name = "temperatures.average_temp", column = "averageTemp"),
                @FieldResult(name = "temperatures.min_temp", column = "minTemp"),
                @FieldResult(name = "temperatures.max_temp", column = "maxTemp"),
                @FieldResult(name = "population", column = "population")
            }
        )
    }
)
public class ChartData {
  long year;

  @Embedded
  TemperatureDto temperatures;
  long population;
}
