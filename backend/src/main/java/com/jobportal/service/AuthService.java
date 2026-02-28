package com.jobportal.service;

import com.jobportal.dto.*;
import com.jobportal.entity.*;
import com.jobportal.exception.BadRequestException;
import com.jobportal.repository.*;
import com.jobportal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        String roleName = "ROLE_" + request.getRole().toUpperCase();
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new BadRequestException("Invalid role: " + request.getRole()));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .isActive(true)
                .isApproved(roleName.equals(Role.CANDIDATE))
                .build();

        user = userRepository.save(user);

        // Create profile based on role
        if (roleName.equals(Role.CANDIDATE)) {
            CandidateProfile profile = CandidateProfile.builder().user(user).build();
            candidateProfileRepository.save(profile);
        } else if (roleName.equals(Role.RECRUITER)) {
            RecruiterProfile profile = RecruiterProfile.builder().user(user).build();
            recruiterProfileRepository.save(profile);
        }

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String token = tokenProvider.generateToken(auth);

        return new AuthResponse(token, user.getId(), user.getEmail(),
                user.getFullName(), user.getRole().getName());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String token = tokenProvider.generateToken(auth);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (!user.getIsActive()) {
            throw new BadRequestException("Account is suspended");
        }

        return new AuthResponse(token, user.getId(), user.getEmail(),
                user.getFullName(), user.getRole().getName());
    }
}
