package com.jobportal.repository;

import com.jobportal.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE j.isActive = true " +
            "AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
            "AND (:jobType IS NULL OR j.jobType = :jobType) " +
            "AND (:experienceLevel IS NULL OR j.experienceLevel = :experienceLevel)")
    Page<Job> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("jobType") Job.JobType jobType,
            @Param("experienceLevel") Job.ExperienceLevel experienceLevel,
            Pageable pageable);

    Page<Job> findByPostedByIdAndIsActiveTrue(Long userId, Pageable pageable);

    Page<Job> findByCompanyIdAndIsActiveTrue(Long companyId, Pageable pageable);

    @Query("SELECT COUNT(j) FROM Job j WHERE j.isActive = true")
    long countActiveJobs();
}
