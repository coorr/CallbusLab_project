package call.web.demo.repository.liked.dto;

import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikedRequestDto {
    private Long item;
    private Long user;

    public LikedRequestDto(Liked liked) {
        this.item = liked.getItem().getId();
        this.user = liked.getUser().getId();
    }
}
