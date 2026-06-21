package io.github.kaffite.moneygatherservice.goal;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Goal g set g.description = ?2, g.currentAmount = ?3, g.target = ?4 where g.id = ?1")
    int setById(Long id, String description, int currentAmount, int target);

}
    