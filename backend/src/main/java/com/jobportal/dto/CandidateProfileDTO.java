package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfileDTO {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String avatarUrl;
    private String headline;
    private String summary;
    private Integer experienceYears;
    private String phone;
    private String location;
    private String resumeUrl;
    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private Set<String> skills;
    private LocalDateTime createdAt;
}
