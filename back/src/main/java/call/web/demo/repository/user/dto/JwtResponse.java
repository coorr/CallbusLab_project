package call.web.demo.repository.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
	private String token;
	private String username;
	private Long id;
	private List<String> roles;

	public JwtResponse(String token, Long id, String username, List<String> roles) {
		this.token = token;
		this.id = id;
		this.username = username;
		this.roles = roles;
	}
}
