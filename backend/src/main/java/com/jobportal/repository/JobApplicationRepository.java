package com.jobportal.repository;

import com.jobportal.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    Page<JobApplication> findByCandidateId(Long candidateId, Pageable pageable);

    Page<JobApplication> findByJobId(Long jobId, Pageable pageable);

    boolean existsByJobIdAndCandidateId(Long jobId, Long candidateId);

    Optional<JobApplication> findByJobIdAndCandidateId(Long jobId, Long candidateId);

    @Query("SELECT COUNT(a) FROM JobApplication a")
    long countAll();

    @Query("SELECT COUNT(a) FROM JobApplication a WHERE a.job.postedBy.id = :recruiterId")
    long countByRecruiterId(Long recruiterId);
}
