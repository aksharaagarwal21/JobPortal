package com.jobportal.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UpdateCandidateProfileRequest {
    private String headline;
    private String summary;
    private Integer experienceYears;
    private String phone;
    private String location;
    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private Set<String> skills;
}
