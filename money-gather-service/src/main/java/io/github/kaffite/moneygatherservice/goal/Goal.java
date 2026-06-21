package io.github.kaffite.moneygatherservice.goal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invoice_seq")
    @SequenceGenerator(name = "invoice_seq", sequenceName = "invoice_sequence", allocationSize = 1)
    private Long id;
    private String description;
    private int currentAmount;
    private int target;

    public Goal(String description, int currentAmount, int target) {
        this.description = description;
        this.currentAmount = currentAmount;
        this.target = target;
    }


}
