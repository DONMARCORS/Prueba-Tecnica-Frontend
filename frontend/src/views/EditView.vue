<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Editar Usuario
                </div>
                <div class="card-body">
                    <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-address-book"></i></span>
                            <input type="text" v-model="name" id="name" class="form-control" maxlength="60" placeholder="Nombre" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                            <input type="email" v-model="email"  id="email" class="form-control" maxlength="60" placeholder="Email" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-calendar"></i></span>
                            <input type="date" v-model="born_date" id="born_date" class="form-control" maxlength="60" placeholder="Fecha de nacimiento" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-phone"></i></span>
                            <input type="number" v-model="phone_number" id="phone_number" class="form-control" maxlength="60" placeholder="Numero de Telefono" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-male"></i></span>
                            <input type="number" v-model="role_id" id="role_id" class="form-control" maxlength="60" placeholder="Rol" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success">
                                <i class="fa-solid fa-floppy-disk">
                                    Guardar
                                </i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {show_alert, enviarSolicitud} from "@/funciones";
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    export default {
        data(){
            return{
                id:0,
                name:'',
                email:'',
                born_date:'',
                phone_number:'',
                role_id:'',
                url:'http://localhost:8080/users'
            }
        },
        mounted(){
            const route = useRoute();
            this.id = route.params.id;
            console.log(this.id);
            this.url = this.url+'/'+this.id;
            this.getUser();
        },
        methods:{
            getUser(){
                axios.get(this.url).then(
                    response => (
                        this.name = response.data['name'],
                        this.email = response.data['email'],
                        this.born_date = response.data['born_date'],
                        this.phone_number = response.data['phone_number'],
                        this.role_id = response.data['role_id']
                    )
                )
            },
            guardar(){
                event.preventDefault();
                if(this.name.trim() === ''){
                    show_alert('Escribe el nombre','warning','nombre');
                } else if(this.email.trim() === ''){
                    show_alert('Escribe el email','warning','email');
                }  else {
                    var parametros = {
                        id:this.id,
                        name:this.name.trim(), 
                        email:this.email,
                        born_date:this.born_date,
                        phone_number:this.phone_number,
                        role_id:this.role_id
                    }
                    enviarSolicitud('put',parametros,this.url,'Usuario modificado');
                }
            }
        }
    }
</script>