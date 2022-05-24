package call.web.demo.repository.liked;

import call.web.demo.model.Item;
import call.web.demo.model.Liked;
import call.web.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikedRepository extends JpaRepository<Liked, Long> {


    @Query("select count(l) > 0 from Liked l where l.item = ?1  AND l.user = ?2 ")
    boolean findByItemAndUser(Item item, User user);

    @Modifying(clearAutomatically=true)
    @Query("delete from Liked l where l.item = ?1  AND l.user = ?2 ")
    void findByItemAndUserEntity(Item item, User user);

}
