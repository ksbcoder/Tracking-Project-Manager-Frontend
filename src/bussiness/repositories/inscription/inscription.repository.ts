import { Observable } from 'rxjs';
import { StateInscription } from 'src/base/utils/enums';
import { InscriptionRespondedDTO } from 'src/domain/DTO/inscription/inscriptionRespondedDTO';
import { NewInscriptionDTO } from 'src/domain/DTO/inscription/newInscriptionDTO';
import { NewInscriptionCommand } from 'src/domain/commands/inscription/newInscriptionCommand';
import { InscriptionModel } from 'src/domain/models/inscription/inscription.model';

export abstract class InscriptionRepository {
  abstract createInscriptionAsync(
    newInscriptionDTO: NewInscriptionCommand
  ): Observable<NewInscriptionDTO>;

  abstract deleteInscriptionAsync(
    idInscription: string
  ): Observable<InscriptionModel>;

  abstract getInscriptionByUserIdAsync(
    idUser: string
  ): Observable<InscriptionModel>;

  abstract getInscriptionsNoRespondedAsync(): Observable<InscriptionModel[]>;

  abstract respondInscriptionAsync(params: {
    idInscription: string;
    value: StateInscription;
  }): Observable<InscriptionRespondedDTO>;
}
