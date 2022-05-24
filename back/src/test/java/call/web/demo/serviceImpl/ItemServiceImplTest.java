package call.web.demo.serviceImpl;

import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import call.web.demo.repository.item.ItemRepository;
import call.web.demo.repository.item.dto.ItemRequestDto;
import call.web.demo.repository.liked.LikedRepository;
import call.web.demo.repository.liked.dto.LikedResponseDto;
import call.web.demo.repository.user.UserRepository;
import call.web.demo.repository.user.dto.MessageResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class ItemServiceImplTest {

    @InjectMocks
    ItemServiceImpl itemService;

    @Mock
    ItemRepository itemRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    LikedRepository likedRepository;

    @DisplayName("게시글_생성")
    @Test
    public void createItemUser() throws Exception {
        // given
        Long userId = 1L;
        when(userRepository.getById(any())).thenReturn(user());
        when(itemRepository.save(any())).thenReturn(item());

        // when
        itemService.createItemUser(userId, itemDto());

        // then
        assertEquals("질문이 있습니다.", item().getTitle());
        assertEquals("몸이 좋아질려면 단백질을 얼마나 먹어야할까요?", item().getContent());

    }

    @DisplayName("게시글_변경")
    @Test
    public void updateItemById() throws Exception {
        // given
        Long itemId = 1L;
        when(itemRepository.findItemById(any())).thenReturn(item());

        // when
        ResponseEntity<MessageResponse> result = itemService.updateItemById(itemId, itemDto());
        // then
        assertEquals(null, result);
    }

    @DisplayName("게시글_변경_예외")
    @Test
    public void updateItemById_check() throws Exception {
        // given
        Long itemId = 1L;
        when(itemRepository.findItemById(any())).thenReturn(null);

        // when
        ResponseEntity<MessageResponse> result = itemService.updateItemById(itemId, itemDto());
        // then
        assertEquals("게시글을 찾을 수 없습니다.", result.getBody().getMessage());

    }

    @DisplayName("게시글_삭제")
    @Test
    public void deleteItemById() throws Exception {
        // given
        Long itemId = 1L;
        when(itemRepository.selectItemById(any())).thenReturn(item());
        when(itemRepository.deleteUpdateFalse(any(), any())).thenReturn(1);
        // when
        ResponseEntity<?> result = itemService.deleteItemById(itemId);

        // then
        assertEquals(200, result.getStatusCodeValue());
    }

    @DisplayName("게시글_좋아요")
    @Test
    public void likeItemAndUserById() throws Exception {
        // given
        when(itemRepository.findItemById(any())).thenReturn(item());
        when(userRepository.getById(any())).thenReturn(user());
        when(likedRepository.findByItemAndUser(any(), any())).thenReturn(false);
        when(likedRepository.save(any())).thenReturn(liked());
        // when
        ResponseEntity<?> result = itemService.likeItemAndUserById(item().getId(), user().getId());

        Object body = result.getBody();
        Class clzz = Class.forName(body.getClass().getCanonicalName());
        Method method = clzz.getDeclaredMethod("getItem");
        // then
        assertEquals(200, result.getStatusCodeValue());
        assertEquals(item().getId(), method.invoke(body));
    }



    public ItemRequestDto itemDto() {
        ItemRequestDto itemDtoOne = ItemRequestDto.builder()
                .title("김진성(공인중개사)")
                .content("내용 변경")
                .build();
        return itemDtoOne;
    }

    public User user() {
        List<Item> item = new ArrayList<>();
        User user = User.builder()
                .id(1L)
                .username("김진성")
                .password("123123")
                .account_type("세입자")
                .items(item)
                .build();
        return user;
    }

    public Item item() {
        Item itemOne = Item.builder()
                .id(1L)
                .title("질문이 있습니다.")
                .content("몸이 좋아질려면 단백질을 얼마나 먹어야할까요?")
                .user(user())
                .build();
        return itemOne;
    }

    public Liked liked() {
        Liked liked = Liked.builder()
                .id(1L)
                .item(item())
                .user(user())
                .build();
        return liked;
    }
}