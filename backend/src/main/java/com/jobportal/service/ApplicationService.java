package com.jobportal.service;

import com.jobportal.dto.ApplicationDTO;
import com.jobportal.dto.ApplyJobRequest;
import com.jobportal.entity.*;
import com.jobportal.exception.BadRequestException;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

        private final JobApplicationRepository applicationRepository;
        private final JobRepository jobRepository;
        private final UserRepository userRepository;
        private final CandidateProfileRepository candidateProfileRepository;
        private final NotificationService notificationService;

        @Transactional
        public ApplicationDTO apply(ApplyJobRequest request, String email) {
                User candidate = userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                Job job = jobRepository.findById(request.getJobId())
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                if (applicationRepository.existsByJobIdAndCandidateId(job.getId(), candidate.getId())) {
                        throw new BadRequestException("You have already applied for this job");
                }

                CandidateProfile profile = candidateProfileRepository.findByUserId(candidate.getId())
                                .orElse(null);

                JobApplication application = JobApplication.builder()
                                .job(job)
                                .candidate(candidate)
                                .coverLetter(request.getCoverLetter())
                                .resumeUrl(profile != null ? profile.getResumeUrl() : null)
                                .status(JobApplication.Status.PENDING)
                                .build();

                application = applicationRepository.save(application);

                // Notify recruiter
                notificationService.createNotification(
                                job.getPostedBy().getId(),
                                "New Application",
                                candidate.getFullName() + " applied for " + job.getTitle(),
                                "APPLICATION",
                                "/recruiter/jobs/" + job.getId() + "/applicants");

                return toDTO(application);
        }

        @Transactional(readOnly = true)
        public Page<ApplicationDTO> getCandidateApplications(String email, Pageable pageable) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                return applicationRepository.findByCandidateId(user.getId(), pageable).map(this::toDTO);
        }

        @Transactional(readOnly = true)
        public Page<ApplicationDTO> getJobApplicants(Long jobId, String email, Pageable pageable) {
                Job job = jobRepository.findById(jobId)
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                if (!job.getPostedBy().getEmail().equals(email)) {
                        throw new BadRequestException("Not authorized to view applicants for this job");
                }

                return applicationRepository.findByJobId(jobId, pageable).map(this::toDTO);
        }

        @Transactional
        public ApplicationDTO updateApplicationStatus(Long applicationId, String status, String email) {
                JobApplication application = applicationRepository.findById(applicationId)
                                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

                if (!application.getJob().getPostedBy().getEmail().equals(email)) {
                        throw new BadRequestException("Not authorized to update this application");
                }

                application.setStatus(JobApplication.Status.valueOf(status));
                application = applicationRepository.save(application);

                // Notify candidate
                notificationService.createNotification(
                                application.getCandidate().getId(),
                                "Application Update",
                                "Your application for " + application.getJob().getTitle() + " has been "
                                                + status.toLowerCase(),
                                "APPLICATION",
                                "/candidate/applications");

                return toDTO(application);
        }

        private ApplicationDTO toDTO(JobApplication app) {
                return ApplicationDTO.builder()
                                .id(app.getId())
                                .jobId(app.getJob().getId())
                                .jobTitle(app.getJob().getTitle())
                                .companyName(app.getJob().getCompany() != null ? app.getJob().getCompany().getName()
                                                : null)
                                .candidateId(app.getCandidate().getId())
                                .candidateName(app.getCandidate().getFullName())
                                .candidateEmail(app.getCandidate().getEmail())
                                .resumeUrl(app.getResumeUrl())
                                .coverLetter(app.getCoverLetter())
                                .status(app.getStatus().name())
                                .appliedAt(app.getAppliedAt())
                                .updatedAt(app.getUpdatedAt())
                                .build();
        }
}
