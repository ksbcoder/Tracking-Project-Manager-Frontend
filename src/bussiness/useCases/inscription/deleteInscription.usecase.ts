import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { InscriptionRepository } from 'src/bussiness/repositories/inscription/inscription.repository';
import { InscriptionModel } from 'src/domain/models/inscription/inscription.model';

export class DeleteInscriptionUseCase
  implements UseCase<string, InscriptionModel>
{
  constructor(private inscriptionRepository: InscriptionRepository) {}

  execute(idInscription: string): Observable<InscriptionModel> {
    return this.inscriptionRepository.deleteInscriptionAsync(idInscription);
  }
}
