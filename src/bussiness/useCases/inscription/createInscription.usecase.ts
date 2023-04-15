import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { InscriptionRepository } from 'src/bussiness/repositories/inscription/inscription.repository';
import { NewInscriptionDTO } from 'src/domain/DTO/inscription/newInscriptionDTO';
import { NewInscriptionCommand } from 'src/domain/commands/inscription/newInscriptionCommand';

export class CreateInscriptionUseCase
  implements UseCase<NewInscriptionCommand, NewInscriptionDTO>
{
  constructor(private inscriptionRepository: InscriptionRepository) {}

  execute(inscription: NewInscriptionCommand): Observable<NewInscriptionDTO> {
    return this.inscriptionRepository.createInscriptionAsync(inscription);
  }
}
