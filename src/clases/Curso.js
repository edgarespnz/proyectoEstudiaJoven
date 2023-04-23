class Curso {
    constructor(nombre, nivel, anio , material, evaluaciones){
        this.nombre = nombre;
        this.nivel = nivel;
        this.anio = anio;
        this.material = material;
        this.evaluaciones = evaluaciones; 
    }

    getNombres(){
        return this.nombre;
    }

    getMaterial(){
        return this.material;
    }

    getEvaluaciones(){
        return this.evaluaciones;
    }
}

export default Curso