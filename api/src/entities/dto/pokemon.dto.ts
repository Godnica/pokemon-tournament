import { IsNumber, IsString, IsArray } from "class-validator";
import { Team } from "../team.entity";


export class PokemonDto{

    @IsNumber()
    readonly id;
    
    @IsString()
    readonly name;

    @IsNumber() 
    readonly base_experience

    @IsString()
    readonly sprite_img

    @IsArray()
    readonly types

    @IsArray()
    readonly abilities

    readonly team : Team

}