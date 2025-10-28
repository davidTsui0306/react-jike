// 用戶相關所有請求
import { request } from "@/utils";


// 登陸請求
export function loginAPI(formData){
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData
    })
}

// 獲取用戶信息

export function getProfileAPI(){
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}
