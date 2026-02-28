package com.jobportal.controller;

import com.jobportal.dto.*;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<Page<JobDTO>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String experienceLevel,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                jobService.searchJobs(keyword, location, jobType, experienceLevel,
                        PageRequest.of(page, size, Sort.by("createdAt").descending())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<JobDTO> createJob(@Valid @RequestBody CreateJobRequest request,
            Authentication auth) {
        return ResponseEntity.ok(jobService.createJob(request, auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id,
            @Valid @RequestBody CreateJobRequest request,
            Authentication auth) {
        return ResponseEntity.ok(jobService.updateJob(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteJob(@PathVariable Long id, Authentication auth) {
        jobService.deleteJob(id, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully"));
    }

    @GetMapping("/{id}/applicants")
    public ResponseEntity<Page<ApplicationDTO>> getApplicants(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication auth) {
        // This is handled by ApplicationService via the controller below
        return ResponseEntity.ok(null); // Delegated to ApplicationController
    }
}
