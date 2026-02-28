package com.jobportal.repository;

import com.jobportal.entity.SavedJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    Page<SavedJob> findByUserId(Long userId, Pageable pageable);

    Optional<SavedJob> findByUserIdAndJobId(Long userId, Long jobId);

    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}
