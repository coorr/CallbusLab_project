package call.web.demo.serviceImpl;


import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import call.web.demo.repository.item.ItemRepository;
import call.web.demo.repository.item.dto.ItemIdResponseDto;
import call.web.demo.repository.item.dto.ItemRequestDto;
import call.web.demo.repository.item.dto.ItemResponseDto;
import call.web.demo.repository.liked.LikedRepository;
import call.web.demo.repository.liked.dto.LikedResponseDto;
import call.web.demo.repository.user.UserRepository;
import call.web.demo.repository.user.dto.MessageResponse;
import call.web.demo.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final LikedRepository likedRepository;

    @Override
    public List<ItemResponseDto> getItemAll() {
        List<Item> item = itemRepository.findAllByIdDesc();
        return itemResponseDto(item);
    }

    @Override
    public ResponseEntity<?> getItemById(Long itemId) {
        try {
            Item itemById = itemRepository.findItemById(itemId);
            ItemResponseDto itemDto = new ItemResponseDto(itemById);

            return ResponseEntity.ok().body(itemDto);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("게시글을 찾을 수 없습니다."));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<MessageResponse> updateItemById(Long itemId, ItemRequestDto itemDto) {
        try {
            Item itemById = itemRepository.findItemById(itemId);

            itemById.setTitle(itemDto.getTitle());
            itemById.setContent(itemDto.getContent());

            return null;
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("게시글을 찾을 수 없습니다."));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<?> deleteItemById(Long itemId) {
        try {
            Item itemById = itemRepository.selectItemById(itemId);
            if (itemById.getId() != null) {
                String deleteTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-mm-dd'T'HH:mm:ss"));
                itemRepository.deleteUpdateFalse(itemById.getId(), deleteTime);
            }
            ItemIdResponseDto itemDto = new ItemIdResponseDto(itemById.getId());

            return ResponseEntity.ok().body(itemDto);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("게시글을 찾을 수 없습니다."));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<?> likeItemAndUserById(Long itemId, Long userId) {
        try {
            Item itemById = itemRepository.findItemById(itemId);
            User userById = userRepository.getById(userId);

            Liked liked = Liked.createLiked(itemById, userById);

            if (!isNotAlreadyLike(itemById, userById)) {
                likedRepository.save(liked);
                LikedResponseDto likeDto = new LikedResponseDto(itemById.getId(), userById.getId());
                return ResponseEntity.ok().body(likeDto);
            }
            return null;
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("게시글을 찾을 수 없습니다."));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<?> unlikeItemAndUserById(Long itemId, Long userId) {
        try {
            Item itemById = itemRepository.findItemById(itemId);
            User userById = userRepository.getById(userId);

            likedRepository.findByItemAndUserEntity(itemById, userById);
            LikedResponseDto likeDto = new LikedResponseDto(itemById.getId(), userById.getId());
            return ResponseEntity.ok().body(likeDto);

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("게시글을 찾을 수 없습니다."));
        }
    }

    @Transactional
    @Override
    public void createItemUser(Long userId, ItemRequestDto itemDto) {
        User userById = userRepository.getById(userId);
        String usernameType = usernameType(userById);
        Item item = Item.createItem(userById.getUsername()+usernameType, itemDto.getTitle(), itemDto.getContent(), userById);

        itemRepository.save(item);
    }

    private String usernameType(User user) {
        if (user.getAccount_type().equals("ROLE_REALTOR")) {
            return "(공인중개사)";
        } else if (user.getAccount_type().equals("ROLE_LESSOR")) {
            return "(임대인)";
        } else if (user.getAccount_type().equals("ROLE_LESSEE")) {
            return "(임차인)";
        }
        return null;
    }

    private List<ItemResponseDto> itemResponseDto(List<Item> item) {
        return item.stream().map(b -> new ItemResponseDto(b)).collect(Collectors.toList());
    }

    private boolean isNotAlreadyLike(Item item, User user) {
        return likedRepository.findByItemAndUser(item, user);
    }
}
