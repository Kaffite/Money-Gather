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
                    .map(e -> new GoalResponseDTO(e.getId(), e.getDescription(), e.getCurrentAmount(), e.getTarget()))
                .collect(Collectors.toList());
        return result;
    }

    public GoalResponseDTO saveGoal(GoalRequestDTO requestDTO) {
        Goal goal = repository.save(new Goal(requestDTO.getDescription(), requestDTO.getCurrentAmount(), requestDTO.getTarget()));
        return new GoalResponseDTO(goal.getId(), goal.getDescription(), goal.getCurrentAmount(), goal.getTarget());
    }

//    public GoalResponseDTO editGoal(GoalRequestDTO requestDTO, Long id) {
//        Optional<Goal> goal = repository.findById(id);
//        // TODO: Better response if not found
//        if (!goal.isPresent()) return null;
//
//    }
}
