package call.web.demo.repository.item;

import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select i from Item i where i.deletedFlag = false order by i.id desc")
    List<Item> findAllByIdDesc();

    @Query("select i from Item i where i.deletedFlag = false  and i.id = ?1")
    Item findItemById(Long itemId);

    @Query(value = "select * from item where item.item_id = ?1", nativeQuery = true)
    Item selectItemById(Long itemId);

    @Modifying(clearAutomatically=true)
    @Query("update Item i set i.deletedFlag=true, i.deleted_at = ?2 where i.id = ?1  ")
    Integer deleteUpdateFalse(Long id, String deleteTime);
}
