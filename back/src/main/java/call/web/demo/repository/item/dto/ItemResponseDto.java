package call.web.demo.repository.item.dto;

import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import call.web.demo.repository.liked.dto.LikedRequestDto;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponseDto {
    private Long itemId;
    private Long userId;
    private String usernameType;
    private String title;
    private String content;
    private Set<LikedRequestDto> likes;

    public ItemResponseDto(Item item) {
        this.itemId = item.getId();
        this.userId = item.getUser().getId();
        this.usernameType = item.getUserType();
        this.title = item.getTitle();
        this.content = item.getContent();
        this.likes = item.getLikes().stream()
                .map(like -> new LikedRequestDto(like))
                .collect(Collectors.toSet());
    }


}
