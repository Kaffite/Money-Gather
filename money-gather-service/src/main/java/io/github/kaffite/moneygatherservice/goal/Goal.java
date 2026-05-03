package io.github.kaffite.moneygatherservice.goal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invoice_seq")
    @SequenceGenerator(name = "invoice_seq", sequenceName = "invoice_sequence", allocationSize = 1)
    private Long id;
    private String description;
    private int goal;
    private int saved;

    public Goal(String description, int goal, int saved) {
        this.description = description;
        this.goal = goal;
        this.saved = saved;
    }
}
