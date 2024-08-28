package com.rmit_climate.backend.controller;

import com.rmit_climate.backend.dto.ChartData;
import com.rmit_climate.backend.service.ChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("chart")
@RequiredArgsConstructor
public class ChartController {

    private final ChartService chartService;



}
