package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private String jobType;
    private String experienceLevel;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String currency;
    private Boolean isActive;
    private LocalDate deadline;
    private Set<String> skills;
    private Long companyId;
    private String companyName;
    private String companyLogoUrl;
    private Long postedById;
    private String postedByName;
    private LocalDateTime createdAt;
}
