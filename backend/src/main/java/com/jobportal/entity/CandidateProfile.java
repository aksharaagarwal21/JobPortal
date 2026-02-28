package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "candidate_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 200)
    private String headline;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "experience_years")
    private Integer experienceYears = 0;

    @Column(length = 20)
    private String phone;

    @Column(length = 200)
    private String location;

    @Column(name = "resume_url", length = 500)
    private String resumeUrl;

    @Column(name = "linkedin_url", length = 300)
    private String linkedinUrl;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Column(name = "portfolio_url", length = 300)
    private String portfolioUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "candidate_skills", joinColumns = @JoinColumn(name = "candidate_profile_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @Builder.Default
    private Set<Skill> skills = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
