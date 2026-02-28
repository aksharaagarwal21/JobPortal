package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterProfileDTO {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String avatarUrl;
    private String position;
    private String phone;
    private String bio;
    private Boolean isApproved;
    private CompanyDTO company;
    private LocalDateTime createdAt;
}
