package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.Temperature;
import com.rmit_climate.backend.dto.ChartData;
import com.rmit_climate.backend.dto.CompareYearResponseDto;
import com.rmit_climate.backend.dto.MaxDataRange;
import com.rmit_climate.backend.dto.TemperatureDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Integer> {

    @Query("SELECT count(*) FROM Temperature WHERE city IS NULL AND country IS NULL AND state IS NULL")
    long countAllGlobalTemperaturePoint();

    @Query("SELECT count(*) FROM Temperature " +
            "WHERE country IS NOT NULL " +
            "AND city IS NULL " +
            "AND state IS NULL")
    long countAllCountryTemperaturePoint();

    @Query("SELECT count(*) FROM Temperature " +
            "WHERE country IS NOT NULL " +
            "AND city IS NOT NULL " +
            "AND state IS NULL")
    long countAllCityTemperaturePoint();

    @Query("SELECT count(*) FROM Temperature " +
            "WHERE country IS NOT NULL " +
            "AND city IS NULL " +
            "AND state IS NOT NULL")
    long countAllStateTemperaturePoint();


    @Query("SELECT MIN(year) AS min, MAX(year) AS max FROM Temperature ")
    MaxDataRange getDataRange();

    @Query("SELECT NEW com.rmit_climate.backend.dto.CompareYearResponseDto(" +
            "NEW com.rmit_climate.backend.dto.TemperatureDto(" +
            "   SUM(t1.averageTemp - t2.averageTemp), " +
            "   SUM(t1.minTemp - t2.minTemp), " +
            "   SUM(t1.maxTemp - t2.maxTemp)" +
            "), " +
            "NEW com.rmit_climate.backend.dto.TemperatureDto(" +
            "   (SUM(t1.averageTemp - t2.averageTemp) / SUM(t2.averageTemp)) * 100, " +
            "   (SUM(t1.minTemp - t2.minTemp) / SUM(t2.minTemp)) * 100, " +
            "   (SUM(t1.maxTemp - t2.maxTemp) / SUM(t2.maxTemp)) * 100" +
            ")" +
            ") " +
            "FROM Temperature t1 " +
            "JOIN Temperature t2 ON t1.country.id = t2.country.id " +
            "WHERE (:startYear IS NULL OR t1.year = :startYear) " +
            "  AND (:endYear IS NULL OR t2.year = :endYear) " +
            "  AND (:countryCode IS NULL OR t1.country.countryCode = :countryCode) " +
            "  AND (:countryCode IS NULL OR t2.country.countryCode = :countryCode) " +
            "  AND t1.city IS NULL AND t2.city IS NULL" +
            "  AND t1.state IS NULL AND t2.state IS NULL")
    CompareYearResponseDto getTemperatureChanges(@Param("startYear") Integer startYear,
                                                 @Param("endYear") Integer endYear,
                                                 @Param("countryCode") String countryCode);


    @Query("SELECT year, averageTemp, minTemp, maxTemp FROM Temperature WHERE city IS NULL AND country IS NULL AND state IS NULL")
    List<Object[]> getGlobalTemp();

    @Query(value = "SELECT "
        + "p2.average_temp AS endAmount, "
        + "p1.average_temp AS startAmount, "
        + "p1.min_temp AS startAmountMin, "
        + "p1.max_temp AS startAmountMax, "
        + "p2.min_temp AS endAmountMin, "
        + "p2.max_temp AS endAmountMax, "
        + "(((CAST(p2.average_temp AS numeric) - p1.average_temp) / p1.average_temp) * 100) AS percentageChange, "
        + "(((CAST(p2.min_temp AS numeric) - p1.min_temp) / p1.min_temp) * 100) AS percentageChangeMin, "
        + "(((CAST(p2.max_temp AS numeric) - p1.max_temp) / p1.max_temp) * 100) AS percentageChangeMax "
        + "FROM temperature p1 "
        + "JOIN temperature p2 ON p1.country_code = p2.country_code "
        + "AND p1.year = :start "
        + "AND p2.year = :end "
        + "AND p1.country_code = :countryCode "
        + "AND p1.city_id IS NULL "
        + "AND p2.city_id IS NULL "
        + "AND p2.state_id IS NULL "
        + "AND p1.state_id IS NULL ", nativeQuery = true)
    List<Object[]> getPercentageChangeCountry(@Param("countryCode") String countryCode,
        @Param("start") int start,
        @Param("end") int end);


    @Query(value = "SELECT p2.average_temp, p1.average_temp, " +
        "(((CAST(p2.average_temp AS numeric) - p1.average_temp) / p1.average_temp) * 100) AS percentage_change "
        +
        "FROM temperature p1 " +
        "JOIN temperature p2 ON p1.country_code = p2.country_code " +
        "AND p1.year = :start " +
        "AND p2.year = :end " +
        "AND p1.country_code = :countryCode "
        + "AND p1.city_id = :cityId "
        + "AND p2.city_id = :cityId "
        + "AND p2.state_id IS NULL "
        + "AND p1.state_id IS NULL ", nativeQuery = true)
    List<Object[]> getPercentageChangeCity(@Param("countryCode") String countryCode, @Param("cityId") String cityId,
        @Param("start") int start,
        @Param("end") int end);

    @Query(value = "SELECT p2.average_temp, p1.average_temp, " +
        "(((CAST(p2.average_temp AS numeric) - p1.average_temp) / p1.average_temp) * 100) AS percentage_change "
        +
        "FROM temperature p1 " +
        "JOIN temperature p2 ON p1.country_code = p2.country_code " +
        "AND p1.year = :start " +
        "AND p2.year = :end " +
        "AND p1.country_code = :countryCode "
        + "AND p1.city_id IS NULL "
        + "AND p2.city_id IS NULL "
        + "AND p2.state_id = :stateId "
        + "AND p1.state_id = :stateId ", nativeQuery = true)
    List<Object[]> getPercentageChangeState(@Param("countryCode") String countryCode, @Param("stateId") String stateId,
        @Param("start") int start,
        @Param("end") int end);

    @Query("SELECT year, averageTemp, minTemp, maxTemp FROM Temperature "
        + "WHERE country.countryCode = :countryCode "
        + "AND state IS NULL "
        + "AND city IS NULL ")
    List<Object[]> getCountry(String countryCode);

    @Query("SELECT year, averageTemp, minTemp, maxTemp FROM Temperature "
        + "WHERE country.countryCode = :countryCode "
        + "AND state IS NULL "
        + "AND city.id = :cityId")
    List<Object[]> getCountryCity(String countryCode, Integer cityId);

    @Query("SELECT year, averageTemp, minTemp, maxTemp FROM Temperature "
        + "WHERE country.countryCode = :countryCode "
        + "AND state.id = :stateId "
        + "AND city IS NULL")
    List<Object[]> getCountryState(String countryCode, Integer stateId);
}
