package call.web.demo.serviceImpl.user;

import call.web.demo.jwt.JwtUtils;
import call.web.demo.model.ERole;
import call.web.demo.model.User;
import call.web.demo.repository.user.UserRepository;
import call.web.demo.repository.user.dto.JwtResponse;
import call.web.demo.repository.user.dto.LoginRequest;
import call.web.demo.repository.user.dto.MessageResponse;
import call.web.demo.repository.user.dto.SignupRequest;
import call.web.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;


    @Override
    public List<User> selectAll() {
        return userRepository.selectAll();
    }

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("아이디 또는 비밀번호가 일치하지 않습니다."));
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }


    @Transactional
    @Override
    public ResponseEntity<MessageResponse> registerUser(SignupRequest signUpRequest) {
        System.out.println("signUpRequest.getUsername() = " + signUpRequest.getUsername());
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("이미 존재하는 아이디입니다."));
        }
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAuthen());

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new MessageResponse("회원가입 완료되었습니다."));
    }


}




