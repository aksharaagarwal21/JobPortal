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
public class CompanyDTO {
    private Long id;
    private String name;
    private String description;
    private String website;
    private String logoUrl;
    private String location;
    private String industry;
    private String companySize;
    private Integer foundedYear;
    private LocalDateTime createdAt;
}
