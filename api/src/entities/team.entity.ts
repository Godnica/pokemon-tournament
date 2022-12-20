import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";

import { Pokemon } from "./pokemon.entity";

@Entity()
export class Team{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team_name: string    

    @CreateDateColumn()
    created_at: Date;

    @JoinTable()
    @OneToMany(()=> Pokemon, (pokemon)=>pokemon.team, {cascade:true})
    pokemons: Pokemon[]
}