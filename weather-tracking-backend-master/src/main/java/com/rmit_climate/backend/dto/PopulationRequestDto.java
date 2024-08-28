package com.rmit_climate.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class PopulationRequestDto {

  @NotBlank(message = "Country code is required")
  private String countryCode;

  @Nullable
  private String stateId;

  @Nullable
  private String cityId;

}
