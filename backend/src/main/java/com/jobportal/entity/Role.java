package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String name;

    public static final String CANDIDATE = "ROLE_CANDIDATE";
    public static final String RECRUITER = "ROLE_RECRUITER";
    public static final String ADMIN = "ROLE_ADMIN";
}
