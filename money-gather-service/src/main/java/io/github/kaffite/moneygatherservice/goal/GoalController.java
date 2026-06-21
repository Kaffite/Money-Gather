package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequiredArgsConstructor
public class GoalController {
    private final GoalService service;

    @GetMapping("/goals")
    public List<GoalResponseDTO> getAllGoals(){
        return service.getAllGoals();
    }

    @PostMapping("/goals")
    public GoalResponseDTO addNewGoal(@RequestBody GoalRequestDTO requestDTO){
        return service.addNewGoal(requestDTO);
    }

    @PutMapping("/goals/{id}")
    public GoalResponseDTO editGoal(@RequestBody GoalRequestDTO requestDTO, @PathVariable Long id){
        return service.setById(requestDTO, id);
    }

    @DeleteMapping("/goals/{id}")
    public ResponseEntity<GoalResponseDTO> deleteGoal(@PathVariable Long id){
        service.deleteByID(id);
        return ResponseEntity.noContent().build();
    }
}
