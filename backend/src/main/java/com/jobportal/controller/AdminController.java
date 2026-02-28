package com.jobportal.controller;

import com.jobportal.dto.*;
import com.jobportal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getUsers(
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        if (role != null) {
            return ResponseEntity.ok(adminService.getUsersByRole(role,
                    PageRequest.of(page, size, Sort.by("createdAt").descending())));
        }
        return ResponseEntity.ok(adminService.getAllUsers(
                PageRequest.of(page, size, Sort.by("createdAt").descending())));
    }

    @GetMapping("/recruiters/pending")
    public ResponseEntity<Page<UserDTO>> getPendingRecruiters(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminService.getPendingRecruiters(PageRequest.of(page, size)));
    }

    @PutMapping("/recruiters/{id}/approve")
    public ResponseEntity<UserDTO> approveRecruiter(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.approveRecruiter(id));
    }

    @PutMapping("/users/{id}/suspend")
    public ResponseEntity<UserDTO> suspendUser(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.suspendUser(id));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse> deleteJob(@PathVariable Long id) {
        adminService.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success("Job deleted by admin"));
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUserDetail(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserDetail(id));
    }

    @GetMapping("/candidates")
    public ResponseEntity<Page<CandidateProfileDTO>> getCandidates(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String skill,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminService.searchCandidates(keyword, location, skill,
                PageRequest.of(page, size, Sort.by("createdAt").descending())));
    }
}
