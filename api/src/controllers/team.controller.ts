import { Body, Controller , Get, NotFoundException, Param, Post} from "@nestjs/common";
import { TeamDto } from "src/entities/dto/team.dto";
import { TeamService } from "src/services/team.services";


@Controller('team')
export class TeamController{
    constructor(
        private readonly teamService: TeamService
    ){}

    @Get()
    async findAll()
    {
        return this.teamService.findAll()
    }

    @Post()
    async create(
        @Body() team
    ){
        return this.teamService.create(team)
    }

}