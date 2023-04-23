class Usuario {
    constructor(uid,rol,nombre, apellidos, universidad){
        this.uid = uid;
        this.rol = rol;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.universidad = universidad;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getApellidos(){
        return this.apellidos;
    }

    setApellidos(apellidos){
        this.apellidos = apellidos;
    }

    getRol(){
        return this.rol
    }
    
    setRol(rol){
        this.rol = rol;
    }
}