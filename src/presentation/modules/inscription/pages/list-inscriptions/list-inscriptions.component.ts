import { Component, OnInit } from '@angular/core';
import { InscriptionModel } from 'src/domain/models/inscription/inscription.model';
import { GetInscriptionsNoRespondedUseCase } from 'src/bussiness/useCases/inscription/getInscriptionsNoResponded.usecase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RespondInscriptionUseCase } from '../../../../../bussiness/useCases/inscription/respondInscription.usecase';
import { DeleteInscriptionUseCase } from 'src/bussiness/useCases/inscription/deleteInscription.usecase';

@Component({
  selector: 'sofka-list-inscriptions',
  templateUrl: './list-inscriptions.component.html',
  styleUrls: ['./list-inscriptions.component.scss'],
})
export class ListInscriptionsComponent implements OnInit {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;
  inscriptionsList: InscriptionModel[];
  frmInscription: FormGroup;
  inscriptionID!: string;
  empty: boolean;
  role: string;

  constructor(
    private getInscriptionsNoRespondedUseCase: GetInscriptionsNoRespondedUseCase,
    private respondInscriptionUseCase: RespondInscriptionUseCase,
    private deteleInscriptionUseCase: DeleteInscriptionUseCase
  ) {
    this.frmInscription = new FormGroup({
      stateInscription: new FormControl('', [Validators.required]),
    });
    this.routeDashboard = ['../../'];
    this.inscriptionsList = [];
    this.empty = false;
    this.role = localStorage.getItem('role') || '';
    setTimeout(() => {
      this.render = true;
    }, 300);
  }

  //#region ngOnInit
  ngOnInit(): void {
    switch (this.role) {
      case '1':
        this.getInscriptionsNoResponded();
        break;
      default:
        break;
    }
  }
  //#endregion

  modal(inscriptionID: string): void {
    this.inscriptionID = inscriptionID;
  }

  //#region respond inscription with modal
  respondInscription(): void {
    this.convertSelectsValuesToNumber();
    let subRespondIns = this.respondInscriptionUseCase
      .execute({
        idInscription: this.inscriptionID,
        value: this.frmInscription.getRawValue().stateInscription,
      })
      .subscribe({
        next: (response) => this.ngOnInit(),
        error: (error) => console.log(error),
        complete: () => {
          subRespondIns.unsubscribe();
        },
      });
  }
  //#endregion

  //#region
  deleteInscription(inscriptionID: string): void {
    let subDelete = this.deteleInscriptionUseCase
      .execute(inscriptionID)
      .subscribe({
        next: (response) => this.ngOnInit(),
        error: (error) => console.log(error),
        complete: () => {
          subDelete.unsubscribe();
        },
      });
  }
  //#endregion

  //#region consults
  getInscriptionsNoResponded(): void {
    let subGetIns = this.getInscriptionsNoRespondedUseCase.execute().subscribe({
      next: (response) => {
        this.inscriptionsList = response;
        this.empty = false;
      },
      error: (error) => {
        console.log(error), (this.empty = true);
      },
      complete: () => {
        subGetIns.unsubscribe();
      },
    });
  }
  //#endregion

  convertSelectsValuesToNumber(): void {
    this.frmInscription.controls['stateInscription'].setValue(
      Number(this.frmInscription.controls['stateInscription'].value)
    );
  }
}
