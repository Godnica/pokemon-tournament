import { 
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn 
} from "typeorm";

import { Team } from "./team.entity";

@Entity()
export class Pokemon{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    base_experience: number

    @Column()
    types: string
    
    @Column()
    abilities: string

    @Column()
    sprite_img: string

    @ManyToOne(()=>Team, (team)=>team.pokemons, { onDelete: 'CASCADE' })
    team: Team

}