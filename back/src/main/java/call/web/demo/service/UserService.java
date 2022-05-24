package call.web.demo.service;

import call.web.demo.model.User;
import call.web.demo.repository.user.dto.LoginRequest;
import call.web.demo.repository.user.dto.MessageResponse;
import call.web.demo.repository.user.dto.SignupRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface UserService {
    List<User> selectAll();
    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
    ResponseEntity<MessageResponse> registerUser(SignupRequest signUpRequest);
}
