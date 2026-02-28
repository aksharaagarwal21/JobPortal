package com.jobportal.repository;

import com.jobportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role.name = :roleName")
    Page<User> findByRoleName(String roleName, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role.name = 'ROLE_RECRUITER' AND u.isApproved = false")
    Page<User> findPendingRecruiters(Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.name = :roleName")
    long countByRoleName(String roleName);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.name = 'ROLE_RECRUITER' AND u.isApproved = false")
    long countPendingRecruiters();
}
