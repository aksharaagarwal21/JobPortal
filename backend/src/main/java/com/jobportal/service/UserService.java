package com.jobportal.service;

import com.jobportal.dto.*;
import com.jobportal.entity.*;
import com.jobportal.exception.BadRequestException;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Transactional(readOnly = true)
    public CandidateProfileDTO getCandidateProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        CandidateProfile profile = candidateProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return toCandidateDTO(profile);
    }

    @Transactional
    public CandidateProfileDTO updateCandidateProfile(String email, UpdateCandidateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        CandidateProfile profile = candidateProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        if (request.getHeadline() != null)
            profile.setHeadline(request.getHeadline());
        if (request.getSummary() != null)
            profile.setSummary(request.getSummary());
        if (request.getExperienceYears() != null)
            profile.setExperienceYears(request.getExperienceYears());
        if (request.getPhone() != null)
            profile.setPhone(request.getPhone());
        if (request.getLocation() != null)
            profile.setLocation(request.getLocation());
        if (request.getLinkedinUrl() != null)
            profile.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getGithubUrl() != null)
            profile.setGithubUrl(request.getGithubUrl());
        if (request.getPortfolioUrl() != null)
            profile.setPortfolioUrl(request.getPortfolioUrl());

        if (request.getSkills() != null) {
            Set<Skill> skills = new HashSet<>();
            for (String name : request.getSkills()) {
                Skill skill = skillRepository.findByName(name)
                        .orElseGet(() -> skillRepository.save(new Skill(null, name)));
                skills.add(skill);
            }
            profile.setSkills(skills);
        }

        return toCandidateDTO(candidateProfileRepository.save(profile));
    }

    public String uploadResume(String email, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        CandidateProfile profile = candidateProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir, "resumes");
        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/resumes/" + filename;
        profile.setResumeUrl(url);
        candidateProfileRepository.save(profile);

        return url;
    }

    @Transactional(readOnly = true)
    public RecruiterProfileDTO getRecruiterProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        RecruiterProfile profile = recruiterProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return toRecruiterDTO(profile);
    }

    @Transactional
    public RecruiterProfileDTO updateRecruiterProfile(String email, UpdateRecruiterProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        RecruiterProfile profile = recruiterProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        if (request.getPosition() != null)
            profile.setPosition(request.getPosition());
        if (request.getPhone() != null)
            profile.setPhone(request.getPhone());
        if (request.getBio() != null)
            profile.setBio(request.getBio());

        return toRecruiterDTO(recruiterProfileRepository.save(profile));
    }

    @Transactional
    public CompanyDTO updateCompany(String email, CompanyDTO request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        RecruiterProfile profile = recruiterProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        Company company = profile.getCompany();
        if (company == null) {
            company = new Company();
        }
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setWebsite(request.getWebsite());
        company.setLogoUrl(request.getLogoUrl());
        company.setLocation(request.getLocation());
        company.setIndustry(request.getIndustry());
        company.setCompanySize(request.getCompanySize());
        company.setFoundedYear(request.getFoundedYear());

        company = companyRepository.save(company);
        profile.setCompany(company);
        recruiterProfileRepository.save(profile);

        return toCompanyDTO(company);
    }

    @Transactional(readOnly = true)
    public CompanyDTO getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        return toCompanyDTO(company);
    }

    // ---- Mapping helpers ----

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

    private RecruiterProfileDTO toRecruiterDTO(RecruiterProfile p) {
        return RecruiterProfileDTO.builder()
                .id(p.getId())
                .userId(p.getUser().getId())
                .fullName(p.getUser().getFullName())
                .email(p.getUser().getEmail())
                .avatarUrl(p.getUser().getAvatarUrl())
                .position(p.getPosition())
                .phone(p.getPhone())
                .bio(p.getBio())
                .isApproved(p.getUser().getIsApproved())
                .company(p.getCompany() != null ? toCompanyDTO(p.getCompany()) : null)
                .createdAt(p.getCreatedAt())
                .build();
    }

    private CompanyDTO toCompanyDTO(Company c) {
        return CompanyDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .website(c.getWebsite())
                .logoUrl(c.getLogoUrl())
                .location(c.getLocation())
                .industry(c.getIndustry())
                .companySize(c.getCompanySize())
                .foundedYear(c.getFoundedYear())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
