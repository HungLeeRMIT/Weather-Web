package com.rmit_climate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;


public interface MaxDataRange {
    long getMax();
    long getMin();
}
