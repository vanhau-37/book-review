import Book from '#models/book'
import { createBookValidator } from '#validators/create_book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
    public async getAll({ response }: HttpContext) {
        try {
            const rawData = await Book.query().preload('author').orderBy('id')
            return response.status(200).json({data: rawData})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi lấy dữ liệu'})
        }
    }

    public async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createBookValidator)
        try {
            await Book.create({
                title: payload.title,
                authorId: payload.authorId,
            })
            return response.status(201).json({data: 'Thêm thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi thêm dữ liệu'})
        }
    }

    public async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createBookValidator)
        try {
            const book = await Book.findOrFail(params.id)
            book.title = payload.title
            book.authorId = payload.authorId
            await book.save()
            const newBook = await Book.query()
              .where('id', params.id)
              .preload('author')
              .firstOrFail()
            return response.status(200).json({data: newBook})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi sửa dữ liệu'})
        }
    }

    public async remove({ params, response }: HttpContext) {
        try {
            const book = await Book.findOrFail(params.id)
            await book.delete()
            return response.status(200).json({data: 'Xóa thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi xóa dữ liệu'})
        }
    }
}