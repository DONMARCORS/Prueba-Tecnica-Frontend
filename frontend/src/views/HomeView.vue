<template>
  <div class="row">
    <div class="table-responsive">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Numero de telefono</th>
            <th scope="col">Rol</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user, i in users" :key = "user.id">
            <td>{{(i+1)}}</td>
            <td>{{(user.name)}}</td>
            <td>{{(user.email)}}</td>
            <td>{{(user.born_date)}}</td>
            <td>{{(user.phone_number)}}</td>
            <td>{{(user.role_id.id)}}</td>
            <td>
              <router-link :to="{path:'edit/'+user.id}" class="btn btn-light">
                <i class="fa-solid fa-edit"></i>
              </router-link>
              <button class="btn btn-light" v-on:click="eliminar(user.id,user.name)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import { confirm } from "@/funciones";
  export default{
    data(){
      return {users:null}
    },
    mounted(){
      this.getUsers();
    },
    methods: {
      getUsers(){
        axios.get('http://localhost:8080/users').then(
          response => (
            this.users = response.data
          )
        );
      },
      eliminar(id, nombre){
        confirm(id,nombre);
      }
    }
  }
</script>