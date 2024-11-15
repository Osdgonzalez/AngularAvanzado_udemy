import { Routes , RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "../guards/auth.guard";

import { PagesComponent } from "./pages/pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { ProgressComponent } from "./progress/progress.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico/medico.component";
import { BusquedasComponent } from "./busquedas/busquedas.component";
import { AdminGuard } from "../guards/admin.guard";

const routes: Routes = [
    { 
        path: 'dashboard' , component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'grafica1' , component: Grafica1Component, data: { titulo: 'Grafica #1' } },
            { path: 'progress' , component: ProgressComponent, data: { titulo: 'Progress Bar' } },
            { path: 'account-settings' , component: AccountSettingsComponent, data: { titulo: 'Ajuste de Cuenta' } },
            { path: 'promesas' , component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs' , component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil' , component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'buscar/:termino' , component: BusquedasComponent, data: { titulo: 'Busquedas' } },

            //Mantenimientos
            { path: 'hospitales' , component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos' , component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id' , component: MedicoComponent, data: { titulo: 'Mantenimiento de Médicos' } },

            //Rutas para Administrador
            { path: 'usuarios' , canActivate: [AdminGuard] , component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule{}