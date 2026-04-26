import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createReviewValidator = vine.compile(
  vine.object({
    bookId: vine.number(),
    content: vine.string(),
  })
)

createReviewValidator.messagesProvider = new SimpleMessagesProvider({
  'content.required': 'Trường này không được rỗng',
  'bookId.required': 'Vui lòng chọn sách',
})
