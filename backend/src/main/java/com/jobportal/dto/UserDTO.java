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
public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private String role;
    private Boolean isActive;
    private Boolean isApproved;
    private String avatarUrl;
    private String passwordHash;
    private LocalDateTime createdAt;
}
