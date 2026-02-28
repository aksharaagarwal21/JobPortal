package com.jobportal.controller;

import com.jobportal.dto.*;
import com.jobportal.service.JobService;
import com.jobportal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterController {

    private final UserService userService;
    private final JobService jobService;

    @GetMapping("/profile")
    public ResponseEntity<RecruiterProfileDTO> getProfile(Authentication auth) {
        return ResponseEntity.ok(userService.getRecruiterProfile(auth.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<RecruiterProfileDTO> updateProfile(
            @RequestBody UpdateRecruiterProfileRequest request, Authentication auth) {
        return ResponseEntity.ok(userService.updateRecruiterProfile(auth.getName(), request));
    }

    @PutMapping("/company")
    public ResponseEntity<CompanyDTO> updateCompany(@RequestBody CompanyDTO request, Authentication auth) {
        return ResponseEntity.ok(userService.updateCompany(auth.getName(), request));
    }

    @GetMapping("/jobs")
    public ResponseEntity<Page<JobDTO>> getMyJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication auth) {
        return ResponseEntity.ok(
                jobService.getRecruiterJobs(auth.getName(),
                        PageRequest.of(page, size, Sort.by("createdAt").descending())));
    }
}
