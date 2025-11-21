export class DeleteUserUseCase {
    constructor(deletedUserRepository) {
        this.deletedUserRepository = deletedUserRepository;
    }

    async execute(userId) {
        const deletedUser = await this.deletedUserRepository.execute(userId);

        return deletedUser;
    }
}
