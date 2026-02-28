package com.jobportal.controller;

import com.jobportal.dto.CompanyDTO;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final UserService userService;
    private final CompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        List<CompanyDTO> companies = companyRepository.findAll().stream()
                .map(c -> {
                    CompanyDTO dto = new CompanyDTO();
                    dto.setId(c.getId());
                    dto.setName(c.getName());
                    dto.setDescription(c.getDescription());
                    dto.setWebsite(c.getWebsite());
                    dto.setLogoUrl(c.getLogoUrl());
                    dto.setLocation(c.getLocation());
                    dto.setIndustry(c.getIndustry());
                    dto.setCompanySize(c.getCompanySize());
                    dto.setFoundedYear(c.getFoundedYear());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getCompanyById(id));
    }
}
