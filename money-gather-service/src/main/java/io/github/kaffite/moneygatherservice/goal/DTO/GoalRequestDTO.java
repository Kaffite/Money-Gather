package io.github.kaffite.moneygatherservice.goal.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalRequestDTO {

     private int goal;

    private int saved;

    public GoalRequestDTO(int goal, int saved) {
        this.goal = goal;
        this.saved = saved;
    }

    @Override
    public String toString() {
        return "GoalRequestDTO{" +
                "goal=" + goal +
                ", saved=" + saved +
                '}';
    }
}
