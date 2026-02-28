package com.jobportal.service;

import com.jobportal.dto.*;
import com.jobportal.entity.*;
import com.jobportal.exception.BadRequestException;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final SavedJobRepository savedJobRepository;

    @Transactional(readOnly = true)
    public Page<JobDTO> searchJobs(String keyword, String location,
            String jobType, String experienceLevel, Pageable pageable) {
        Job.JobType type = jobType != null ? Job.JobType.valueOf(jobType) : null;
        Job.ExperienceLevel level = experienceLevel != null ? Job.ExperienceLevel.valueOf(experienceLevel) : null;

        return jobRepository.searchJobs(keyword, location, type, level, pageable)
                .map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return toDTO(job);
    }

    @Transactional
    public JobDTO createJob(CreateJobRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .location(request.getLocation())
                .jobType(request.getJobType() != null ? Job.JobType.valueOf(request.getJobType())
                        : Job.JobType.FULL_TIME)
                .experienceLevel(
                        request.getExperienceLevel() != null ? Job.ExperienceLevel.valueOf(request.getExperienceLevel())
                                : Job.ExperienceLevel.ENTRY)
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .currency(request.getCurrency() != null ? request.getCurrency() : "INR")
                .deadline(request.getDeadline())
                .postedBy(user)
                .isActive(true)
                .build();

        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            job.setCompany(company);
        }

        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
            Set<Skill> skills = resolveSkills(request.getSkills());
            job.setSkills(skills);
        }

        return toDTO(jobRepository.save(job));
    }

    @Transactional
    public JobDTO updateJob(Long id, CreateJobRequest request, String email) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getPostedBy().getEmail().equals(email)) {
            throw new BadRequestException("You can only edit your own jobs");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        job.setLocation(request.getLocation());
        if (request.getJobType() != null)
            job.setJobType(Job.JobType.valueOf(request.getJobType()));
        if (request.getExperienceLevel() != null)
            job.setExperienceLevel(Job.ExperienceLevel.valueOf(request.getExperienceLevel()));
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        if (request.getCurrency() != null)
            job.setCurrency(request.getCurrency());
        job.setDeadline(request.getDeadline());

        if (request.getSkills() != null) {
            job.setSkills(resolveSkills(request.getSkills()));
        }

        return toDTO(jobRepository.save(job));
    }

    @Transactional
    public void deleteJob(Long id, String email) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        // Allow admin or job owner
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!job.getPostedBy().getEmail().equals(email) && !user.getRole().getName().equals(Role.ADMIN)) {
            throw new BadRequestException("Not authorized to delete this job");
        }

        jobRepository.delete(job);
    }

    @Transactional(readOnly = true)
    public Page<JobDTO> getRecruiterJobs(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return jobRepository.findByPostedByIdAndIsActiveTrue(user.getId(), pageable).map(this::toDTO);
    }

    @Transactional
    public void saveJob(Long jobId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (savedJobRepository.existsByUserIdAndJobId(user.getId(), jobId)) {
            throw new BadRequestException("Job already saved");
        }

        SavedJob saved = SavedJob.builder().user(user).job(job).build();
        savedJobRepository.save(saved);
    }

    @Transactional
    public void unsaveJob(Long jobId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        SavedJob saved = savedJobRepository.findByUserIdAndJobId(user.getId(), jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Saved job not found"));
        savedJobRepository.delete(saved);
    }

    @Transactional(readOnly = true)
    public Page<JobDTO> getSavedJobs(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return savedJobRepository.findByUserId(user.getId(), pageable)
                .map(saved -> toDTO(saved.getJob()));
    }

    private Set<Skill> resolveSkills(Set<String> skillNames) {
        Set<Skill> skills = new HashSet<>();
        for (String name : skillNames) {
            Skill skill = skillRepository.findByName(name)
                    .orElseGet(() -> skillRepository.save(new Skill(null, name)));
            skills.add(skill);
        }
        return skills;
    }

    private JobDTO toDTO(Job job) {
        return JobDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .location(job.getLocation())
                .jobType(job.getJobType().name())
                .experienceLevel(job.getExperienceLevel().name())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .currency(job.getCurrency())
                .isActive(job.getIsActive())
                .deadline(job.getDeadline())
                .skills(job.getSkills().stream().map(Skill::getName).collect(Collectors.toSet()))
                .companyId(job.getCompany() != null ? job.getCompany().getId() : null)
                .companyName(job.getCompany() != null ? job.getCompany().getName() : null)
                .companyLogoUrl(job.getCompany() != null ? job.getCompany().getLogoUrl() : null)
                .postedById(job.getPostedBy().getId())
                .postedByName(job.getPostedBy().getFullName())
                .createdAt(job.getCreatedAt())
                .build();
    }
}
