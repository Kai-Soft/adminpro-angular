import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard } from '../services/guards/admin.guard';

// Componentes Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PartidosComponent } from './partidos/partidos.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CandidatoComponent } from './candidatos/candidato.component';
import { CentrosComponent } from './centros/centros.component';
import { CentroComponent } from './centros/centro.component';
import { CentrosVotacionComponent } from './votos/centros-votacion.component';
import { MesasVotacionComponent } from './votos/mesas-votacion.component';
import { ParticipationComponent } from './dashboard/participation.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            // tslint:disable-next-line:max-line-length
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Control Registro de Votación' } },
            { path: 'dashboard-participation', component: ParticipationComponent, data: { titulo: 'Control de Participación' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'graph', component: GraphComponent,  data: { titulo: 'Graficas' } },
            { path: 'account', component: AccountSettingsComponent,  data: { titulo: 'Configuracion de Cuenta' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
            // Administración
            { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Mantenimiento de Usuarios' } },
            // Mantenimientos
            { path: 'perfiles', component: PerfilesComponent, canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Perfiles Políticos' } },
            { path: 'partidos', component: PartidosComponent, canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Partidos Políticos' } },
            { path: 'periodos', component: PeriodosComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Mantenimiento de Periodos de Participación' } },
            { path: 'candidatos', component: CandidatosComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Mantenimiento de Candidatos' } },
            { path: 'candidato/:id', component: CandidatoComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Perfil de Candidato' } },
            { path: 'centros', component: CentrosComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Mantenimiento de Centros de Votación' } },
            { path: 'centro/:id', component: CentroComponent, canActivate: [ AdminGuard ],
                 data: { titulo: 'Centro de Votación' } },
            // Operaciones
            { path: 'centros-votacion', component: CentrosVotacionComponent, data: { titulo: 'Centros de Votación' } },
            { path: 'centro/:id/mesas', component: MesasVotacionComponent, data: { titulo: 'Mesas de Votación' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
