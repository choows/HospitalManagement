import {BaseUrl} from './Base';


export const FuncGetAppointmentList=(PatientId = "", DoctorId = "", PatientName = "", DoctorName = "")=>{
    const Url = BaseUrl + "Appointment/GetAppointmentList";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    PatientId : PatientId,
                    DoctorId : DoctorId,
                    PatientName : PatientName,
                    DoctorName : DoctorName
                }
            )
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.success){
                resolve(resp);
            }else{
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp)=>{
            reject(exp);
        })
    })
}



export const FuncNewAppointment=(AppointmentDateTime = "", isPatient = true, PatientId = "", DoctorId = "", Remark = "")=>{
    const Url = BaseUrl + "Appointment/NewAppointment";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    AppointmentDateTime : AppointmentDateTime,
                    isPatient : isPatient,
                    PatientId : PatientId,
                    DoctorId : DoctorId,
                    Remark : Remark
                }
            )
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.success){
                resolve(resp);
            }else{
                if(resp.message){
                    window.alert(resp.message);
                }
                reject(resp);
            }
        }).catch((exp)=>{
            reject(exp);
        })
    })
}


export const FuncNewNonPatientAppointment=(App)=>{
    const Url = BaseUrl + "Appointment/NewNonPatientAppointment";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(App)
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.success){
                resolve(resp);
            }else{
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp)=>{
            reject(exp);
        })
    })
}

export const FuncUpdateAppointment=(AppointId = "", AppointmentDateTime = null, Remark = "", Status = "")=>{
    const Url = BaseUrl + "Appointment/UpdateAppointment";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    AppointmentDateTime : AppointmentDateTime ,
                    AppointId : AppointId,
                    Status : Status,
                    Remark : Remark
                }
            )
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.success){
                resolve(resp);
            }else{
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp)=>{
            console.log("Failed");
            console.log(exp);
            reject(exp);
        })
    })
}
