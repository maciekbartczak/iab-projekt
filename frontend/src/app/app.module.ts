import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuService, NbMenuModule, NbToastrModule, NbIconModule,
} from '@nebular/theme';
import { environment } from "../environments/environment";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APIInterceptor } from "./interceptors/api.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { NotFoundComponent } from './common/not-found/not-found.component';
import { NbEvaIconsModule } from "@nebular/eva-icons";

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbButtonModule,
        NbUserModule,
        NbMenuModule.forRoot(),
        NbContextMenuModule,
        NbToastrModule.forRoot(),
        NbEvaIconsModule,
        NbIconModule,
    ],
    providers: [
        {provide: "BASE_URL", useValue: environment.baseUrl},
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        NbMenuService,
        JwtHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
