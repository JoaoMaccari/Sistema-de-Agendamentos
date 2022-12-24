var appointment = require("../models/Appointment")
var mongoose = require('mongoose')
const { finished } = require("stream")


//const que gurada a tabela 
const Appo = mongoose.model("Appointment", appointment)

//método de criacao, recebe os dados inseridos no formulario
class AppointmentService{
    async Create(name, email, description, cpf, date, time){
        //crio um objeto instanciado a partir da variavel que importa a tabela
        var newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false 
        })
        try{
            await newAppo.save()
            return true;
        }catch(err){
            return false;
        }
        
    }
}


//ao importar a classe, um objeto já é criado
module.exports = new AppointmentService();