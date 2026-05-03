package io.github.kaffite.moneygatherservice.goal;

import io.github.kaffite.moneygatherservice.goal.DTO.GoalRequestDTO;
import io.github.kaffite.moneygatherservice.goal.DTO.GoalResponseDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GoalController {

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    @CrossOrigin("http://localhost:5173")
    @GetMapping("/goals")
    public List<GoalResponseDTO> getAllGoals(){
        return service.getAllGoals();
    }

    @PostMapping("/goals")
    public GoalResponseDTO saveGoal(@RequestBody GoalRequestDTO requestDTO){
        return service.saveGoal(requestDTO);
    }

}
