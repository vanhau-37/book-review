import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createAuthorValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(100)
    })
)

createAuthorValidator.messagesProvider = new SimpleMessagesProvider({
    'required': 'Trường này không được rỗng',
    'name.maxLength': 'Tối đa 100 ký tự',
})