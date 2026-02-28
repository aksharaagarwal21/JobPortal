package com.jobportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Data
public class CreateJobRequest {
    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    private String description;

    private String requirements;

    @Size(max = 200)
    private String location;

    private String jobType;
    private String experienceLevel;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String currency;
    private LocalDate deadline;
    private Set<String> skills;
    private Long companyId;
}
