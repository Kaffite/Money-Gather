package io.github.kaffite.moneygatherservice.goal.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponseDTO {

    private Long id;
    private String description;
    private int goal;
    private int saved;


}
