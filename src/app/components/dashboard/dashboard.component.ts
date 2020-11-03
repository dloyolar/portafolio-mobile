import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaInterface } from 'src/app/models/empresa-interface';
import { AccidenteInterface } from '../../models/accidente-interface';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Identifiers } from '@angular/compiler';
import { CapacitacionInterface } from '../../models/capacitacion-interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public crudService: EmpresaService, private router: Router) { }

  ngOnInit() {
    this.checkAdmin();
  }

  id_accidente: number;
  descripcion_acc: string;
  fecha_accidente: Date;
  cliente_rut_cliente: number;
  cliente_nombre_usuario: string;
  Accidentes: AccidenteInterface[];
  Accidentes2: AccidenteInterface[];
  Usuarios: UsuarioInterface[];
  Empresas: EmpresaInterface[];
  Capacitacion: CapacitacionInterface[];
  nombre_empresa: string;
  public isAdmin: boolean = false;
  public isEmpleado: boolean = false;
  rut_cliente: number;
  nombre_cliente: string;
  apellido_cliente: string;
  tel_cliente: number;
  nombre_usuario: string;
  empresa_id_empresa: number;
  tipo_usuario: number;

  // Capacitacion
  fecha_visita: Date;
  desc_capacitacion: string;

  consultarNombreUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_usuario;
  }

  consultarRutUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.rut_cliente;
  }

  consultarNombreCliente(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_cliente;
  }

  consultarTipoUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(dataUsuario)
    return dataUsuario.tipo_usuario;

  }

  consultarIdEmpresa(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.empresa_id_empresa;
  }

  checkAdmin():void{
    if(this.consultarTipoUsuario() === 1){
      this.isAdmin = false;
    } else if (this.consultarTipoUsuario() === 2) {
      this.isAdmin = true;
    }
  }

  addAccidente(){
    this.crudService.insertAccidente(this.descripcion_acc, this.fecha_accidente, this.consultarRutUsuario(), this.consultarNombreUsuario()).subscribe((res:AccidenteInterface)=>{
      window.location.reload();
    })
  }

  listarAccidente(){
    this.crudService.GetAccidentesByUser(this.consultarNombreUsuario()).subscribe((res:AccidenteInterface[])=>{
      this.Accidentes = res;
    })
  }

  listarAccidentes(){
    this.crudService.getAccidentes().subscribe((res:AccidenteInterface[])=>{
      this.Accidentes2 = res;
      console.log(this.Accidentes2)
    })
  }

  listarUsuarios(){
    this.crudService.getUsers().subscribe((res:UsuarioInterface[])=>{
      this.Usuarios = res;
      console.log(this.Usuarios);
    })
  }

  getDataUser(rut_cliente, nombre_cliente, apellido_cliente, tel_cliente, nombre_usuario, empresa_id_empresa, tipo_usuario){
    this.rut_cliente = rut_cliente;
    this.nombre_cliente = nombre_cliente;
    this.apellido_cliente = apellido_cliente;
    this.tel_cliente = tel_cliente;
    this.nombre_usuario = nombre_usuario;
    this.empresa_id_empresa = empresa_id_empresa;
    this.tipo_usuario = tipo_usuario;
  }

  updateUser(){
    this.crudService.updateUser(this.rut_cliente, this.nombre_cliente, this.apellido_cliente, this.tel_cliente, this.nombre_usuario, this.empresa_id_empresa, this.tipo_usuario).subscribe((res:UsuarioInterface[])=>{
      this.Usuarios = res;
      window.location.reload();
    })
  }

  addCapacitacion(){
    this.crudService.insertCapacitacion(this.fecha_visita, this.desc_capacitacion, this.consultarIdEmpresa(), this.consultarNombreUsuario(), this.consultarRutUsuario() ).subscribe((res:CapacitacionInterface[])=>{
      this.Capacitacion = res;
      window.location.reload();
    })
  }

}
