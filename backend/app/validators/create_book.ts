import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    authorId: vine.number(),
    title: vine.string().maxLength(200),
  })
)

createBookValidator.messagesProvider = new SimpleMessagesProvider({
  'title.required': 'Trường này không được rỗng',
  'authorId.required': 'Vui lòng chọn tác giả',
  'title.maxLength': 'Tối đa 200 ký tự',
})
