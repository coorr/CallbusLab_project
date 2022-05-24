package call.web.demo.repository.user.dto;

import lombok.*;


import javax.validation.constraints.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    private String authen;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;


}
