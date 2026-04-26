package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalService {
    private GoalRepository repository;

    public GoalService(GoalRepository repository) {
        this.repository = repository;
    }

    public List<GoalResponseDTO> getAllGoals(){
        List<Goal> entities = repository.findAll();
        List<GoalResponseDTO> result =
                entities.stream()
                .map(e -> new GoalResponseDTO(e.getId(), e.getGoal(), e.getSaved()))
                .collect(Collectors.toList());
        return result;
    }

    public GoalResponseDTO saveGoal(GoalRequestDTO requestDTO) {
        Goal goal = repository.save(new Goal(requestDTO.getGoal(), requestDTO.getSaved()));
        return new GoalResponseDTO(goal.getId(),goal.getGoal(), goal.getSaved());
    }
}
