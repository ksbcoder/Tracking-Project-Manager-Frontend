import { InscriptionRepository } from 'src/bussiness/repositories/inscription/inscription.repository';
import { CreateInscriptionUseCase } from '../../../bussiness/useCases/inscription/createInscription.usecase';
import { DeleteInscriptionUseCase } from 'src/bussiness/useCases/inscription/deleteInscription.usecase';
import { GetInscriptionByUserIdUseCase } from 'src/bussiness/useCases/inscription/getInscriptionByUserId.usecase';
import { GetInscriptionsNoRespondedUseCase } from '../../../bussiness/useCases/inscription/getInscriptionsNoResponded.usecase';
import { RespondInscriptionUseCase } from '../../../bussiness/useCases/inscription/respondInscription.usecase';
import { NgModule } from '@angular/core';
import { InscriptionImplementationRepository } from './inscription-implementation.repository';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const CreateInscriptionUseCaseFactory = (
  inscriptionRepo: InscriptionRepository
) => new CreateInscriptionUseCase(inscriptionRepo);
export const CreateInscriptionUseCaseProvider = {
  provide: CreateInscriptionUseCase,
  useFactory: CreateInscriptionUseCaseFactory,
  deps: [InscriptionRepository],
};

const DeleteInscriptionUseCaseFactory = (
  inscriptionRepo: InscriptionRepository
) => new DeleteInscriptionUseCase(inscriptionRepo);
export const DeleteInscriptionUseCaseProvider = {
  provide: DeleteInscriptionUseCase,
  useFactory: DeleteInscriptionUseCaseFactory,
  deps: [InscriptionRepository],
};

const GetInscriptionByUserIdUseCaseFactory = (
  inscriptionRepo: InscriptionRepository
) => new GetInscriptionByUserIdUseCase(inscriptionRepo);
export const GetInscriptionByUserIdUseCaseProvider = {
  provide: GetInscriptionByUserIdUseCase,
  useFactory: GetInscriptionByUserIdUseCaseFactory,
  deps: [InscriptionRepository],
};

const GetInscriptionsNoRespondedUseCaseFactory = (
  inscriptionRepo: InscriptionRepository
) => new GetInscriptionsNoRespondedUseCase(inscriptionRepo);
export const GetInscriptionsNoRespondedUseCaseProvider = {
  provide: GetInscriptionsNoRespondedUseCase,
  useFactory: GetInscriptionsNoRespondedUseCaseFactory,
  deps: [InscriptionRepository],
};

const RespondInscriptionUseCaseFactory = (
  inscriptionRepo: InscriptionRepository
) => new RespondInscriptionUseCase(inscriptionRepo);
export const RespondInscriptionUseCaseProvider = {
  provide: RespondInscriptionUseCase,
  useFactory: RespondInscriptionUseCaseFactory,
  deps: [InscriptionRepository],
};

@NgModule({
  providers: [
    CreateInscriptionUseCaseProvider,
    DeleteInscriptionUseCaseProvider,
    GetInscriptionByUserIdUseCaseProvider,
    GetInscriptionsNoRespondedUseCaseProvider,
    RespondInscriptionUseCaseProvider,
    {
      provide: InscriptionRepository,
      useClass: InscriptionImplementationRepository,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class InscriptionModule {}
