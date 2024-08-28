package com.rmit_climate.backend.controller;

import com.rmit_climate.backend.dto.CompareYearRequestDto;
import com.rmit_climate.backend.dto.CompareYearResponseDto;
import com.rmit_climate.backend.dto.DataPointMeta;
import com.rmit_climate.backend.service.MetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("meta")
@RequiredArgsConstructor
public class MetaController {

    private final MetaService metaService;

    @GetMapping()
    public ResponseEntity<DataPointMeta> getMeta() {
        return ResponseEntity.ok(metaService.getMeta());
    }

    @PostMapping()
    public ResponseEntity<CompareYearResponseDto> compareYear(CompareYearRequestDto request) {
        return ResponseEntity.ok(metaService.compareYear(request));

    }

    @GetMapping("team-members")
    public ResponseEntity<?> getTeamMember() {
        return ResponseEntity.ok(metaService.getTeamMember());
    }
}
