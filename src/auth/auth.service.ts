import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegistrationRequest } from './model/registration-request.model';
import { Repository } from 'typeorm';
import { LoginRequest } from './model/login-request';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenRes } from './model/token-res';
import { UserRes } from './model/user-res';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser(req) {
    const user = await this.getUserByEmail(req.user.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userRes = new UserRes();
    userRes.email = user.email;
    userRes.firstName = user.firstName;
    userRes.lastName = user.lastName;
    userRes.dateOfBirth = user.dateOfBirth;
    userRes.gender = user.gender;
    userRes.countryCode = user.countryCode;
    userRes.phone = user.phone;
    userRes.citizenship = user.citizenship;

    return userRes;
  }

  async createUser(req: RegistrationRequest) {
    const user = await this.getUserByEmail(req.email);

    if (user) {
      throw new HttpException('User is alrady exists', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(req.password, 7);
    const newUser = await this.usersRepository.save({ ...req, password });
    return this.generateToken(newUser);
  }

  async loginUser(req: LoginRequest): Promise<TokenRes> {
    const user = await this.validateUser(req);
    return this.generateToken(user);
  }

  private async validateUser(req: LoginRequest) {
    const user = await this.getUserByEmail(req.email);

    if (!user) {
      throw new HttpException('User nof found!', HttpStatus.NOT_FOUND);
    }

    const isPasswordEquals = await compare(req.password, user.password);

    if (!isPasswordEquals) {
      throw new HttpException('Wrong password!', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  private generateToken(user: User): TokenRes {
    const { id, email, firstName, lastName, gender } = user;
    const payload = { id, email, firstName, lastName, gender };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
