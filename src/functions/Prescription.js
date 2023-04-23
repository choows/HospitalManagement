import {BaseUrl} from './Base';


export const FuncGetPrescriptions=(DoctorId, PatientId)=>{
    const Url = BaseUrl + "Prescription/GetPrescriptions";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    DoctorId : DoctorId,
                    PatientId : PatientId
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

export const FuncGetPrescriptionsByAppointment=(AppointmentId)=>{
    const Url = BaseUrl + "Prescription/GetPrescriptionsByAppointment";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    AppointmentId : AppointmentId
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

export const FuncNewPatientHistory=(PatientId, DoctorId, description = "" , medicines = [])=>{
    const Url = BaseUrl + "Prescription/NewPatientHistory";

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
                    Description : description,
                    newPrescriptionModels : medicines
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

export const FuncAddNewPrescription=(PatientId, DoctorId, Description, AppointmentId, newPrescriptionModels)=>{
    const Url = BaseUrl + "Prescription/AddNewPrescription";
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
                    Description : Description,
                    AppointmentId : AppointmentId,
                    newPrescriptionModels: newPrescriptionModels
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


export const FuncAddNewNonPatientPrescription=(DoctorId, Description, AppointmentId, newPrescriptionModels)=>{
    const Url = BaseUrl + "Prescription/AddNewNonPatientPrescription";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    DoctorId : DoctorId,
                    Description : Description,
                    AppointmentId : AppointmentId,
                    newPrescriptionModels: newPrescriptionModels
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

export const FuncGetPatientHistory=(PatientId = "")=>{
    const Url = BaseUrl + "Prescription/GetPatientHistory";
    if(PatientId != ""){
        Url += "?PatientId=" + PatientId
    }
    return new Promise((resolve, reject)=>{
        fetch(Url).then((resp)=>{
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
//PrescriptionIsCollected

export const FuncPrescriptionIsCollected=(prescriptionId)=>{
    const Url = BaseUrl + "Prescription/PrescriptionIsCollected";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    PrescriptionId : prescriptionId
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
export const FuncNewMedicine=(name = "" , dose = 0)=>{
    const Url = BaseUrl + "Prescription/NewMedicine";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    Name : name,
                    Dose : dose
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
export const FuncUpdateMedicine=(id = 0, name = "" , dose = 0)=>{
    const Url = BaseUrl + "Prescription/UpdateMedicine";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    Id : id,
                    Name : name,
                    Dose : dose
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
export const FuncGetMedicines=()=>{
    const Url = BaseUrl + "Prescription/GetMedicines";
    return new Promise((resolve, reject)=>{
        fetch(Url).then((resp)=>{
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
