package call.web.demo.controller;

import call.web.demo.model.Item;
import call.web.demo.repository.item.dto.ItemRequestDto;
import call.web.demo.repository.item.dto.ItemResponseDto;
import call.web.demo.repository.user.dto.MessageResponse;
import call.web.demo.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:7000", maxAge = 3600)
@RestController
@RequestMapping("/api/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/non/getItemAll")
    public List<ItemResponseDto> getItemAll() {
        return itemService.getItemAll();
    }
    @GetMapping("/getItemById/{itemId}")
    public ResponseEntity<?> getItemById(@PathVariable("itemId")Long itemId) {
        return itemService.getItemById(itemId);
    }
    @PatchMapping("/updateItemById/{itemId}")
    public ResponseEntity<MessageResponse> updateItemById(@PathVariable("itemId")Long itemId, @RequestBody ItemRequestDto itemDto) {
        return itemService.updateItemById(itemId, itemDto);
    }
    @PostMapping("/createItemUser/{userId}")
    public void createItemUser(@PathVariable("userId") Long userId, @RequestBody ItemRequestDto itemDto) {
        itemService.createItemUser(userId, itemDto);
    }
    @DeleteMapping("/deleteItemById/{itemId}")
    public ResponseEntity<?> deleteItemById(@PathVariable("itemId") Long itemId) {
        return itemService.deleteItemById(itemId);
    }
    @PostMapping("/likeItemAndUserById/{itemId}/{userId}")
    public ResponseEntity<?> likeItemAndUserById(@PathVariable("itemId") Long itemId, @PathVariable("userId") Long userId) {
        return itemService.likeItemAndUserById(itemId, userId);
    }
    @DeleteMapping("/unlikeItemAndUserById/{itemId}/{userId}")
    public ResponseEntity<?> unlikeItemAndUserById(@PathVariable("itemId") Long itemId, @PathVariable("userId") Long userId) {
        return itemService.unlikeItemAndUserById(itemId, userId);
    }
}
