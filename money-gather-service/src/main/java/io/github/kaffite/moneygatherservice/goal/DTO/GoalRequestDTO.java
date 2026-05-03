package io.github.kaffite.moneygatherservice.goal.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class GoalRequestDTO {

    private String description;
    private int goal;
    private int saved;

}
