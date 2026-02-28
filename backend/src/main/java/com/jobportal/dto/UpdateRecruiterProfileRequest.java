package com.jobportal.dto;

import lombok.Data;

@Data
public class UpdateRecruiterProfileRequest {
    private String position;
    private String phone;
    private String bio;
}
