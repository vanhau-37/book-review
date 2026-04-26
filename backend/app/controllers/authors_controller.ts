import Author from '#models/author'
import { createAuthorValidator } from '#validators/create_author'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
    public async getAll({ response }: HttpContext) {
        try {
            const rawData = await Author.query().withCount('books').orderBy('id')
            const data = rawData.map(d => ({
                ...d.toJSON(), booksCount: d.$extras.books_count
            }))
            return response.status(200).json({data: data})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi lấy dữ liệu'})
        }
    }

    public async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createAuthorValidator)
        try {
            await Author.create({
                name: payload.name
            })
            return response.status(201).json({data: 'Thêm thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi thêm dữ liệu'})
        }
    }

    public async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createAuthorValidator)
        try {
            const author = await Author.findOrFail(params.id)
            author.name = payload.name

            await author.save()
            return response.status(200).json({data: author})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi sửa dữ liệu'})
        }
    }

    public async remove({ params, response }: HttpContext) {
        try {
            const author = await Author.findOrFail(params.id)
            await author.delete()
            return response.status(200).json({data: 'Xóa thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi xóa dữ liệu'})
        }
    }
}