import { Body, Controller , Get, Param, Post, Put} from "@nestjs/common";
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

    @Get('/:id')
    async find(
        @Param('id') idTeam: string
    ){
        return this.teamService.find(+idTeam)
    }

    @Put('/:id')
    async update(
        @Param('id') idTeam: number,
        @Body() team
    ){
        return this.teamService.update(idTeam, team)
    }

    @Post()
    async create(
        @Body() team
    ){
        return this.teamService.create(team)
    }

}