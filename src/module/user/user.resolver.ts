import { UserCreationRequestDTO, UserUpdateRequestDTO } from './user.types';
import { User } from './../../entity/user.entity';
import { UserService } from './user.service';
import { Query, Resolver, Args, Mutation, Subscription } from '@nestjs/graphql';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.getOneOrThrow(id);
  }

  @Mutation(returns => User)
  async addUser(@Args('newUserData') newUserData: UserCreationRequestDTO): Promise<User> {
    return this.userService.create(newUserData);
  }

  @Mutation(returns => User)
  async updateUser(@Args('id') id: string, @Args('userData') userData: UserUpdateRequestDTO): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Mutation(returns => Boolean)
  async removeUser(@Args('id') id: string) {
    await this.userService.remove(id);
    return true;
  }
}
