// 封裝獲取頻道列表邏輯

import { useState, useEffect } from "react"
import { getChannelAPI } from "@/apis/article"

function useChannel() {
        const [channelList, setChannelList] = useState([])
        
            useEffect(() => {
                // 封裝函數 在函數體內調用接口
                const getChannelList = async () => {
                const res = await getChannelAPI()
                setChannelList(res.data.channels) 
                }
                // 調用函數
                getChannelList()
            }, [])

        return {
            channelList
        }
}

export { useChannel }