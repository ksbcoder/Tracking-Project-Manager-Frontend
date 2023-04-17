import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { StateInscription } from 'src/base/utils/enums';
import { InscriptionRepository } from 'src/bussiness/repositories/inscription/inscription.repository';
import { InscriptionRespondedDTO } from 'src/domain/DTO/inscription/inscriptionRespondedDTO';

export class RespondInscriptionUseCase
  implements
    UseCase<
      { idInscription: string; value: StateInscription },
      InscriptionRespondedDTO
    >
{
  constructor(private inscriptionRepository: InscriptionRepository) {}

  execute(params: {
    idInscription: string;
    value: StateInscription;
  }): Observable<InscriptionRespondedDTO> {
    return this.inscriptionRepository.respondInscriptionAsync(params);
  }
}
