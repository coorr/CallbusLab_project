package call.web.demo.model;



import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.ArrayList;

import static javax.persistence.FetchType.*;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 120)
    @JsonIgnore
    private String password;

    @NotBlank
    private String account_type;

    private String account_id;

    private Boolean quit;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

    @PrePersist
    public void quit_auto(){
        this.quit = Boolean.FALSE;
    }



    public User(String username, String password, String account_type) {
        this.username = username;
        this.password = password;
        this.account_type = account_type;
    }

}
