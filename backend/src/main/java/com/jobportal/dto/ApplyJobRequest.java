package com.jobportal.dto;

import lombok.Data;

@Data
public class ApplyJobRequest {
    private Long jobId;
    private String coverLetter;
}
