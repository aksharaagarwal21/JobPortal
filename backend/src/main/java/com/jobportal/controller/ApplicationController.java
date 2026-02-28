package com.jobportal.controller;

import com.jobportal.dto.*;
import com.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationDTO> apply(@RequestBody ApplyJobRequest request,
            Authentication auth) {
        return ResponseEntity.ok(applicationService.apply(request, auth.getName()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<Page<ApplicationDTO>> getJobApplicants(
            @PathVariable Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication auth) {
        return ResponseEntity.ok(
                applicationService.getJobApplicants(jobId, auth.getName(),
                        PageRequest.of(page, size, Sort.by("appliedAt").descending())));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Authentication auth) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status, auth.getName()));
    }
}
