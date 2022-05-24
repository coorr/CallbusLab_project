package call.web.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    private String userType;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private Set<Liked> likes = new HashSet<>();

    @Column(updatable = false)
    private String created_at;

    private String updated_at;

    private String deleted_at;

    private boolean deletedFlag;

    @PrePersist
    public void createDate(){
        this.created_at = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-mm-dd'T'HH:mm:ss"));
        this.updated_at = created_at;
    }

    @PreUpdate
    public void updateDate(){
        this.updated_at = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-mm-dd'T'HH:mm:ss"));
    }

    public void setUser(User userId) {
        this.user = userId;
        userId.getItems().add(this);
    }

    public static Item createItem(String usernameType, String title, String content, User user) {
        Item item = new Item();
        item.setUserType(usernameType);
        item.setTitle(title);
        item.setContent(content);
        item.setUser(user);

        return item;
    }





}
