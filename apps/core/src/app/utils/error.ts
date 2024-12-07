class AppError extends Error {
    EmailAlreadyUsed = "EMAIL_ALREADY_USED"

    emailAlreadyUsed(message: string) {
        throw new AppError(message)
    }


}