import Swal from "sweetalert2";
import axios from "axios";

export function show_alert(mensaje, icono, foco='') {
    if (foco !== ''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:mensaje,
        con:icono,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    });
}

export function confirm(id,name){
    var url = "http://localhost:8080/users/"+id;
    const swalWithBootstrapButtons= Swal.mixin({
        customClass: {confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger'},
        buttonsStyling:false        
    });
    swalWithBootstrapButtons.fire({
        title: 'Seguro que quiere eliminar al usuario ' + name,
        text: 'Se borraran los datos del usuario para siempre...',
        icon: 'question',
        showCancelButton:true,
        confirmButtonText:'<i class+"fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class+"fa-solid fa-ban"></i> Cancelar',
    }).then((result) => {
        if (result.isConfirmed){
            enviarSolicitud('delete',{id:id},url,'Usuario eliminado')
            window.setTimeout(function(){
                window.location.href='/'
            },1000);
        } else {
            show_alert('Operacion cancelada','info');
        }
    })
}

export function confirm2(id, name){
    axios({ method: "delete", url:"http://localhost:8080/users/"+id});
}

export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({
        method:metodo, url:url, data:parametros
    }).then(function(respuesta){
        var status = respuesta.data[0]['status'];
        if (status === 'success'){
            show_alert(mensaje,status);
            window.setTimeout(function(){
                window.location.href='/'
            },1000);
        } else {
            var listado='';
            var errores = respuesta.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado += errores[key][0]+'.'
            );
            show_alert(listado,'error');
            
        }
    }).catch(function(error){
        window.setTimeout(function(){
            window.location.href='/'
        },1000);
        //show_alert('Error en la solicitud', 'error');
    })
}