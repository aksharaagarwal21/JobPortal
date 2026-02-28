package com.jobportal.controller;

import com.jobportal.dto.*;
import com.jobportal.service.ApplicationService;
import com.jobportal.service.JobService;
import com.jobportal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateController {

    private final UserService userService;
    private final ApplicationService applicationService;
    private final JobService jobService;

    @GetMapping("/profile")
    public ResponseEntity<CandidateProfileDTO> getProfile(Authentication auth) {
        return ResponseEntity.ok(userService.getCandidateProfile(auth.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<CandidateProfileDTO> updateProfile(
            @RequestBody UpdateCandidateProfileRequest request, Authentication auth) {
        return ResponseEntity.ok(userService.updateCandidateProfile(auth.getName(), request));
    }

    @PostMapping("/resume")
    public ResponseEntity<Map<String, String>> uploadResume(
            @RequestParam("file") MultipartFile file, Authentication auth) throws IOException {
        String url = userService.uploadResume(auth.getName(), file);
        return ResponseEntity.ok(Map.of("url", url));
    }

    @GetMapping("/applications")
    public ResponseEntity<Page<ApplicationDTO>> getApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication auth) {
        return ResponseEntity.ok(
                applicationService.getCandidateApplications(auth.getName(),
                        PageRequest.of(page, size, Sort.by("appliedAt").descending())));
    }

    @PostMapping("/saved-jobs/{jobId}")
    public ResponseEntity<ApiResponse> saveJob(@PathVariable Long jobId, Authentication auth) {
        jobService.saveJob(jobId, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Job saved"));
    }

    @DeleteMapping("/saved-jobs/{jobId}")
    public ResponseEntity<ApiResponse> unsaveJob(@PathVariable Long jobId, Authentication auth) {
        jobService.unsaveJob(jobId, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Job unsaved"));
    }

    @GetMapping("/saved-jobs")
    public ResponseEntity<Page<JobDTO>> getSavedJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication auth) {
        return ResponseEntity.ok(
                jobService.getSavedJobs(auth.getName(), PageRequest.of(page, size)));
    }
}
