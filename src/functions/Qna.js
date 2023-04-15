import {BaseUrl} from './Base';


export const FuncNewQna=(Question , Answer)=>{
    const Url = BaseUrl + "Qna/NewQna";
    return new Promise((resolve, reject)=>{
        fetch(Url , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Question : Question,
                Answer : Answer
            })
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


export const FuncgetAllQna=()=>{
    const Url = BaseUrl + "QnA/getAllQna";
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