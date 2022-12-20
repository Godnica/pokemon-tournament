import { IsNumber, IsString, IsDate} from "class-validator";
import { Pokemon } from "../pokemon.entity";

export class TeamDto{
    @IsNumber()
    readonly id;

    @IsString()
    readonly team_name;

    @IsDate()
    readonly date;

    readonly pokemons: Pokemon[]
}