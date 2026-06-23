package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.ResourceNotFoundException;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GoalService {
    private final GoalRepository repository;

    public List<GoalResponseDTO> getAllGoals(){
        List<Goal> entities = repository.findAll(Sort.by("id"));
        List<GoalResponseDTO> result =
                entities.stream()
                    .map(e -> new GoalResponseDTO(e.getId(), e.getDescription(), e.getCurrentAmount(), e.getTarget()))
                .collect(Collectors.toList());
        return result;
    }

    public GoalResponseDTO addNewGoal(GoalRequestDTO requestDTO) {
        Goal goal = repository.save(new Goal(requestDTO.getDescription(), requestDTO.getCurrentAmount(), requestDTO.getTarget()));
        return new GoalResponseDTO(goal.getId(), goal.getDescription(), goal.getCurrentAmount(), goal.getTarget());
    }

    public GoalResponseDTO setById(GoalRequestDTO request, Long id)  {
        repository.setById(
                id,
                request.getDescription(),
                request.getCurrentAmount(),
                request.getTarget());
        Goal response = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Goal with that id does not exist."));
        return new GoalResponseDTO(
                response.getId(), response.getDescription(),
                response.getCurrentAmount(), response.getTarget());
    }

    public void deleteByID(Long id) {
        repository.deleteById(id);
    }
}
