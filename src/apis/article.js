// 和文章相關接口函數

import { request } from "@/utils";


// 獲取頻道列表
export function getChannelAPI(){
    return request({
        url: '/channels',
        method: 'GET',
    })
}
