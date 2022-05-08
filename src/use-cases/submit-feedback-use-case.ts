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

    if (!type) {
      throw new Error('O tipo de bug é necessário');
    }

    if (!comment) {
      throw new Error('O comentário do bug é necessário');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Formato da screenshot invalido');
    }
      
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