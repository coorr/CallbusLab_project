package call.web.demo.service;

import call.web.demo.model.Item;
import call.web.demo.repository.item.dto.ItemRequestDto;
import call.web.demo.repository.item.dto.ItemResponseDto;
import call.web.demo.repository.user.dto.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {

    List<ItemResponseDto> getItemAll();
    ResponseEntity<?> getItemById(Long itemId);
    ResponseEntity<MessageResponse> updateItemById(Long itemId, ItemRequestDto itemDto);
    void createItemUser(Long user_id, ItemRequestDto itemDto);
    ResponseEntity<?> deleteItemById(Long itemId);
    ResponseEntity<?> likeItemAndUserById(Long itemId, Long userId);
    ResponseEntity<?> unlikeItemAndUserById(Long itemId, Long userId);
}
