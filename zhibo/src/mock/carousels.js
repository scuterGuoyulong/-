import Mock from 'mockjs'

export default {
    getCarousels: () => {
        return {
            res: [
                Mock.Random.dataImage("600x400", Mock.Random.csentence()),
                Mock.Random.dataImage("600x400", Mock.Random.csentence()),
                Mock.Random.dataImage("600x400", Mock.Random.csentence()),
                //"https://raw.githubusercontent.com/zone-1614/pic/main/img/20220516171433.png",
                //"https://raw.githubusercontent.com/zone-1614/pic/main/img/20220516171318.png"
            ]
        }
    }
}