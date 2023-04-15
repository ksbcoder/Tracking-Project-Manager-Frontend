import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateInscription } from 'src/base/utils/enums';
import { InscriptionRepository } from 'src/bussiness/repositories/inscription/inscription.repository';
import { InscriptionRespondedDTO } from 'src/domain/DTO/inscription/inscriptionRespondedDTO';
import { NewInscriptionDTO } from 'src/domain/DTO/inscription/newInscriptionDTO';
import { NewInscriptionCommand } from 'src/domain/commands/inscription/newInscriptionCommand';
import { InscriptionModel } from 'src/domain/models/inscription/inscription.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscriptionImplementationRepository extends InscriptionRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createInscriptionAsync(
    newInscriptionDTO: NewInscriptionCommand
  ): Observable<NewInscriptionDTO> {
    return this.http.post<NewInscriptionDTO>(
      environment.urlApiProjects + 'Inscription',
      newInscriptionDTO
    );
  }
  deleteInscriptionAsync(idInscription: string): Observable<InscriptionModel> {
    return this.http.delete<InscriptionModel>(
      environment.urlApiProjects +
        'Inscription/IDidInscription=' +
        idInscription
    );
  }
  getInscriptionByUserIdAsync(idUser: string): Observable<InscriptionModel> {
    return this.http.get<InscriptionModel>(
      environment.urlApiProjects + 'Inscription/UserID?idUser=' + idUser
    );
  }
  getInscriptionsNoRespondedAsync(): Observable<InscriptionModel[]> {
    return this.http.get<InscriptionModel[]>(
      environment.urlApiProjects + 'Inscription/NoResponded'
    );
  }
  respondInscriptionAsync(params: {
    idInscription: string;
    value: StateInscription;
  }): Observable<InscriptionRespondedDTO> {
    return this.http.put<InscriptionRespondedDTO>(
      environment.urlApiProjects +
        'Inscription/Respond?idInscription=' +
        params.idInscription +
        '&value=' +
        params.value,
      params
    );
  }
}
