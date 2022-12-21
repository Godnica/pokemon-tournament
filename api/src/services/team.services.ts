import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeamDto } from "src/entities/dto/team.dto";
import { Pokemon } from "src/entities/pokemon.entity";
import { Team } from "src/entities/team.entity";
import {In, Repository } from "typeorm";

@Injectable()
export class TeamService{
    constructor(
        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,
        @InjectRepository(Pokemon)
        private readonly pokeRepo: Repository<Pokemon>
        
    ){}

    async create(team:TeamDto){                

        const pokemons = await Promise.all(
            team.pokemons.map(async(p)=> await this.pokeRepo.create(p))
        )

        const team_ = await this.teamRepo.create({...team, pokemons});
        
        console.log(team_)

        return await this.teamRepo.save(team_);
    };

    async findAll(){
        return await this.teamRepo.find({relations:{pokemons:true}});
    }

    async find(id: number){
        return await this.teamRepo.find({
            where:{
                id: id
            },
            relations: {
                pokemons: true
            }
        })
    }

    async update(idTeam: number, team: TeamDto){

        await this.teamRepo.delete({
            id: idTeam
        })

        this.create(team);
    }

}