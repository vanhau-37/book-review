import Review from '#models/review'
import { createReviewValidator } from '#validators/create_review'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReviewsController {
    public async getAll({ response }: HttpContext) {
        try {
            const rawData = await Review.query().preload('book', q => {
                q.preload('author')
            }).orderBy('id')
            return response.status(200).json({data: rawData})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi lấy dữ liệu'})
        }
    }

    public async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createReviewValidator)
        try {
            await Review.create({
                content: payload.content,
                bookId: payload.bookId,
            })
            return response.status(201).json({data: 'Thêm thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi thêm dữ liệu'})
        }
    }

    public async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createReviewValidator)
        try {
            const review = await Review.findOrFail(params.id)
            review.content = payload.content
            review.bookId = payload.bookId

            await review.save()
            const newReview = await Review.query()
                .where('id', params.id)
                .preload('book', q => {
                    q.preload('author')
                })
                .firstOrFail()
            return response.status(200).json({data: newReview})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi sửa dữ liệu'})
        }
    }

    public async remove({ params, response }: HttpContext) {
        try {
            const review = await Review.findOrFail(params.id)
            await review.delete()
            return response.status(200).json({data: 'Xóa thành công'})
        } catch (error) {
            return response.status(500).json({data: 'Có lỗi khi xóa dữ liệu'})
        }
    }
}