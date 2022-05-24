package call.web.demo.repository.liked.dto;

import call.web.demo.model.Liked;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikedResponseDto {
    private Long item;
    private Long user;

    public LikedResponseDto(Liked liked) {
        this.item = liked.getItem().getId();
        this.user = liked.getUser().getId();
    }
}
