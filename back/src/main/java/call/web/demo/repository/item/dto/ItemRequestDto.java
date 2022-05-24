package call.web.demo.repository.item.dto;

import call.web.demo.model.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemRequestDto {

    private String title;
    private String content;
    private User user;
}
