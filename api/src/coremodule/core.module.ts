import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entities:
import { Pokemon } from "src/entities/pokemon.entity";
import { Team } from "src/entities/team.entity";


//Controllers:
import { TeamController } from "src/controllers/team.controller";

//Servieces
import { PokemonService } from "src/services/pokemon.service";
import { TeamService } from "src/services/team.services";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Team,
            Pokemon
        ])
    ],
    controllers: [TeamController],
    providers:[
        TeamService,
        PokemonService
    ]
})
export class CoreModule{}