package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_jobs", uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "job_id" }))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @CreationTimestamp
    @Column(name = "saved_at", updatable = false)
    private LocalDateTime savedAt;
}
