package io.github.kaffite.moneygatherservice.goal.DTO;

import lombok.Getter;

@Getter
public class GoalResponseDTO {
    private Long id;

    private int goal;

    private int saved;

    public GoalResponseDTO() {}


    public GoalResponseDTO(Long id, int goal, int saved) {
        this.id = id;
        this.goal = goal;
        this.saved = saved;
    }

    @Override
    public String toString() {
        return "GoalResponseDTO{" +
                "id=" + id +
                ", goal=" + goal +
                ", saved=" + saved +
                '}';
    }
}
