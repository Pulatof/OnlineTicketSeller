import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';
import { Response } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { CustomerGuard } from 'src/guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { PhoneCustomerDto } from './dto/phone-customer.dto';

@ApiTags('Costumers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'register customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('signup')
  registration(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.registration(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'login Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.login(loginCustomerDto, res);
  }


  @ApiOperation({ summary: 'logout Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }


  // @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ){
    return this.customerService.refreshToken(+id, refreshToken, res);
  }


@UseGuards(CustomerGuard)
  @Post(':id/password')
  update_password(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.customerService.updatePassword(+id, updatePasswordDto);
  }

  // @Get('activate/:link')
  // activate(@Param('link') link: string) {
  //   return this.customerService.activate(link);
  // }

  @Get('find')
  getByParam(@Body() findCustomerDto:FindCustomerDto){
    return this.customerService.getByParam(findCustomerDto)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }



@UseGuards(CustomerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }


  @UseGuards(CustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @UseGuards(AdminGuard)
  @Patch("deactivate/:id")
  deactivate(@Param('id') id: string){
    return this.customerService.deactivate(+id)
  }

  @Post('/otp')
newOtp(@Body() phoneCustomerDto:PhoneCustomerDto){
  return this.customerService.newOTP(phoneCustomerDto)
}

@Post('/verify')
verifyOtp(@Body() verifyOtpDto:VerifyOtpDto,
// @Req() req,
@Res({passthrough:true}) res:Response
){
  return this.customerService.verifyOtp(verifyOtpDto, res)
}

}

