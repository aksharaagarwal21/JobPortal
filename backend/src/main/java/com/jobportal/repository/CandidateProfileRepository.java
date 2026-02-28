package com.jobportal.repository;

import com.jobportal.entity.CandidateProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByUserId(Long userId);

    @Query("SELECT DISTINCT cp FROM CandidateProfile cp LEFT JOIN cp.skills s LEFT JOIN cp.user u WHERE " +
            "(:keyword IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(cp.headline) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(cp.summary) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:location IS NULL OR LOWER(cp.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
            "AND (:skill IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :skill, '%')))")
    Page<CandidateProfile> searchCandidates(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("skill") String skill,
            Pageable pageable);
}
