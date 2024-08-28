package com.rmit_climate.backend.repository;

import com.rmit_climate.backend.domain.Meta;
import com.rmit_climate.backend.dto.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MetaRepository extends JpaRepository<Meta, Long> {


  @Query(value = "SELECT m.name as name, m.value as value FROM Meta m WHERE m.type = 'member'", nativeQuery = true)
  List<TeamMember> findAllByTypeTeamMember();
}
