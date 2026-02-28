package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalUsers;
    private long totalCandidates;
    private long totalRecruiters;
    private long totalJobs;
    private long totalApplications;
    private long pendingRecruiters;
}
