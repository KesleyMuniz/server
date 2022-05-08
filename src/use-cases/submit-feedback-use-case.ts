import { MailAdapter } from '../repositories/adapters/mail-adapters';
import { FeedbacksRepository } from '../repositories/feedbacks-repositories'

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}
  async execute({type, comment, screenshot}: SubmitFeedbackUseCaseRequest) {
      await this.feedbacksRepository.create({
        type,
        comment,
        screenshot,
      })
      await this.mailAdapter.sandMail({
        subject: 'Novo Feedback',
        body: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          `</div>`
      ].join('\n')
      })
  }
}