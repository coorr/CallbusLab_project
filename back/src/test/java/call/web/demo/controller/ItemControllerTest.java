package call.web.demo.controller;

import com.google.gson.Gson;
import call.web.demo.model.User;
import call.web.demo.repository.item.dto.ItemRequestDto;
import call.web.demo.service.ItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class ItemControllerTest {

    @InjectMocks
    private ItemController itemController;

    @Mock
    private ItemService itemService;

    private MockMvc mockMvc;

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(itemController).build();
    }

    @DisplayName("게시글_생성")
    @Test
    public void createItemUser() throws Exception {
        // given
        Long userId = 1L;
        doNothing().when(itemService).createItemUser(any(), any());

        // when
        ResultActions result = mockMvc.perform(
                MockMvcRequestBuilders.post("/api/item/createItemUser/{userId}", userId)
                        .contentType(APPLICATION_JSON)
                        .content(new Gson().toJson(itemDto())));

        // then
        result.andExpect(status().isOk()).andReturn();
    }

    @DisplayName("게시글_변경")
    @Test
    public void updateItemById() throws Exception {
        // given
        Long itemId = 1L;
        ResponseEntity responseEntity = ResponseEntity.ok().body(itemDto());
        when(itemService.updateItemById(any(), any())).thenReturn(responseEntity);
        // when
        ResultActions result = mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/item/updateItemById/{itemId}", itemId)
                        .contentType(APPLICATION_JSON)
                        .content(new Gson().toJson(itemDto())));

        // then
        result.andExpect(status().isOk()).andReturn();
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

    @DisplayName("게시글_삭제")
    @Test
    public void deleteItemById() throws Exception {
        // given
        Long itemId = 1L;
        ResponseEntity responseEntity=new ResponseEntity(HttpStatus.OK);
        when(itemService.deleteItemById(any())).thenReturn(responseEntity);
        // when
        ResultActions result = mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/item/deleteItemById/{itemId}", itemId));
        // then
        result.andExpect(status().isOk()).andReturn();
    }

    @DisplayName("게시글_좋아요")
    @Test
    public void likeItemAndUserById() throws Exception {
        // given
        Long itemId = 10L;
        Long userId = 1L;
        ResponseEntity responseEntity=new ResponseEntity(HttpStatus.OK);
        when(itemService.likeItemAndUserById(any(), any())).thenReturn(responseEntity);
        // when
        ResultActions result = mockMvc.perform(
                MockMvcRequestBuilders.post("/api/item/likeItemAndUserById/{itemId}/{userId}", itemId, userId));
        // then
        result.andExpect(status().isOk()).andReturn();
    }

    public ItemRequestDto itemDto() {
        ItemRequestDto itemList = ItemRequestDto.builder()
                .title("질문이 있습니다.")
                .content("몸이 좋아질려면 단백질을 얼마나 먹어야할까요?")
                .build();
        return itemList;
    }

    public User user() {
        User user = User.builder()
                .id(1L)
                .username("김진성")
                .password("123123")
                .account_type("공인중개사")
                .build();
        return user;
    }
}