import { BaseUrl } from './Base';

export const FuncGetUser = () => {
    const Url = BaseUrl + "Users/getUsers";
    return new Promise((resolve, reject) => {
        fetch(Url).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}


export const FuncGetPatient = (value = "", type = "name") => {
    let Url = BaseUrl + "Users/GetPatient";

    if (value != "") {
        Url += "?";
        Url += (type + "=" + value)
    }

    return new Promise((resolve, reject) => {
        fetch(Url).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}


export const FuncGetDoctor = (name = "", id = "") => {
    let Url = BaseUrl + "Users/GetDoctor";
    if (name != "") {
        Url += "?name=" + name
    }
    if (name != "" && id != "") {
        Url += "&id=" + id;
    }
    if (name == "" && id != "") {
        Url += "?id=" + id;
    }
    return new Promise((resolve, reject) => {
        fetch(Url).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}

export const FuncUpdatePatient = (patient) => {
    const Url = BaseUrl + "Users/UpdatePatient";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                patient
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}

export const FuncGetPharmacist = (name = "", id = "") => {
    var Url = BaseUrl + "Users/GetPharmacist";
    if (name != "") {
        Url += "?name=" + name
    }
    if (name != "" && id != "") {
        Url += "&id=" + id;
    }
    if (name == "" && id != "") {
        Url += "?id=" + id;
    }
    return new Promise((resolve, reject) => {
        fetch(Url).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}

export const FuncCreateUser = (username, password, confirmPassword, Email) => {
    const Url = BaseUrl + "Users/CreateUser";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    UserName: username,
                    Password: password,
                    ConfirmPassword: confirmPassword,
                    Email: Email
                }
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}

export const UpdateDoctor = (profile)=>{
    const Url = BaseUrl + "Users/UpdateDoctor";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                profile
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    });
}

export const FuncRegisterPatient = (userId, firstName, lastName, nric, address, contactnum, tag, age, gender, e_contact, e_name, e_relation) => {
    const Url = BaseUrl + "Users/RegisterPatient";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    UserId: userId,
                    FirstName: firstName,
                    LastName: lastName,
                    NRIC: nric,
                    Address: address,
                    ContactNum: contactnum,
                    Age: age,
                    Tag: tag,
                    Gender: gender,
                    EmergencyContactNum : e_contact,
                    EmergencyContactName : e_name,
                    EmergencyContactRelation : e_relation
                }
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}


export const FuncRegisterDoctor = (userId, firstName, lastName, intro, prof, contactnum, email) => {
    const Url = BaseUrl + "Users/RegisterDoctor";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    UserId: userId,
                    FirstName: firstName,
                    LastName: lastName,
                    Introduction: intro,
                    Profession: prof,
                    ContactNum: contactnum,
                    Email: email
                }
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}

export const FuncRegisterPharmacist = (userId, firstName, lastName, intro) => {
    const Url = BaseUrl + "Users/RegisterPharmacist";
    return new Promise((resolve, reject) => {
        fetch(Url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    UserId: userId,
                    FirstName: firstName,
                    LastName: lastName,
                    Introduction: intro
                }
            )
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            if (resp.success) {
                resolve(resp);
            } else {
                window.alert(resp.message);
                reject(resp);
            }
        }).catch((exp) => {
            reject(exp);
        })
    })
}