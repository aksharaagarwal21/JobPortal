package com.jobportal.service;

import com.jobportal.dto.*;
import com.jobportal.entity.*;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final NotificationService notificationService;
    private final CandidateProfileRepository candidateProfileRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::toUserDTO);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getUsersByRole(String role, Pageable pageable) {
        return userRepository.findByRoleName(role, pageable).map(this::toUserDTO);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getPendingRecruiters(Pageable pageable) {
        return userRepository.findPendingRecruiters(pageable).map(this::toUserDTO);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserDetail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getName())
                .isActive(user.getIsActive())
                .isApproved(user.getIsApproved())
                .avatarUrl(user.getAvatarUrl())
                .passwordHash(user.getPassword())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Transactional
    public UserDTO approveRecruiter(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setIsApproved(true);
        user = userRepository.save(user);

        notificationService.createNotification(userId, "Account Approved",
                "Your recruiter account has been approved. You can now post jobs.",
                "SYSTEM", "/recruiter/dashboard");

        return toUserDTO(user);
    }

    @Transactional
    public UserDTO suspendUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setIsActive(!user.getIsActive());
        return toUserDTO(userRepository.save(user));
    }

    public void deleteJob(Long jobId) {
        if (!jobRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job not found");
        }
        jobRepository.deleteById(jobId);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getStats() {
        return DashboardStatsDTO.builder()
                .totalUsers(userRepository.count())
                .totalCandidates(userRepository.countByRoleName(Role.CANDIDATE))
                .totalRecruiters(userRepository.countByRoleName(Role.RECRUITER))
                .totalJobs(jobRepository.countActiveJobs())
                .totalApplications(applicationRepository.countAll())
                .pendingRecruiters(userRepository.countPendingRecruiters())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<CandidateProfileDTO> searchCandidates(String keyword, String location, String skill,
            Pageable pageable) {
        return candidateProfileRepository.searchCandidates(keyword, location, skill, pageable)
                .map(this::toCandidateDTO);
    }

    private UserDTO toUserDTO(User u) {
        return UserDTO.builder()
                .id(u.getId())
                .email(u.getEmail())
                .fullName(u.getFullName())
                .role(u.getRole().getName())
                .isActive(u.getIsActive())
                .isApproved(u.getIsApproved())
                .avatarUrl(u.getAvatarUrl())
                .createdAt(u.getCreatedAt())
                .build();
    }

    private CandidateProfileDTO toCandidateDTO(CandidateProfile p) {
        return CandidateProfileDTO.builder()
                .id(p.getId())
                .userId(p.getUser().getId())
                .fullName(p.getUser().getFullName())
                .email(p.getUser().getEmail())
                .avatarUrl(p.getUser().getAvatarUrl())
                .headline(p.getHeadline())
                .summary(p.getSummary())
                .experienceYears(p.getExperienceYears())
                .phone(p.getPhone())
                .location(p.getLocation())
                .resumeUrl(p.getResumeUrl())
                .linkedinUrl(p.getLinkedinUrl())
                .githubUrl(p.getGithubUrl())
                .portfolioUrl(p.getPortfolioUrl())
                .skills(p.getSkills().stream().map(Skill::getName).collect(Collectors.toSet()))
                .createdAt(p.getCreatedAt())
                .build();
    }
}
