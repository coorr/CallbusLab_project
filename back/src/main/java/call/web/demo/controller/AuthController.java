package call.web.demo.controller;

import java.net.UnknownHostException;
import java.util.List;

import javax.validation.Valid;

import call.web.demo.model.User;
import call.web.demo.repository.user.dto.LoginRequest;
import call.web.demo.repository.user.dto.MessageResponse;
import call.web.demo.repository.user.dto.SignupRequest;
import call.web.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:7000", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AuthController {

	private final UserService userService;


	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws UnknownHostException {
	    return userService.authenticateUser(loginRequest);
	}

	@PostMapping("/signup")
	public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		return userService.registerUser(signUpRequest);
	}

	@GetMapping("/selectAll")
	public ResponseEntity<List<User>> selectAll() {
		return ResponseEntity.ok(userService.selectAll());
	}
}






















