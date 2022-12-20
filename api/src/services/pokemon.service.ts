import { Injectable, NotFoundException  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pokemon } from "src/entities/pokemon.entity";
import { Repository } from "typeorm";

@Injectable()
export class PokemonService{
    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepo: Repository<Pokemon>
    ){}

    

    
}