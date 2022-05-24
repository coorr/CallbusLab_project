package call.web.demo.repository.item.dto;

import call.web.demo.model.Item;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemIdResponseDto {
    private Long itemId;

    public ItemIdResponseDto(Item item) {
        this.itemId = item.getId();
    }
}
