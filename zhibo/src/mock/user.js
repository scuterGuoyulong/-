import Mock from 'mockjs'

export default {
    login: (username, password) => {
        return {
            res: {
                user
            }
        }
    },
    getChatUsers() {
        return {
            res: chatUsers
        }
    }
}

const user = {
    nickname: "UML",
    avatar: "https://raw.githubusercontent.com/zone-1614/pic/main/img/20220502202202.png",
    gender: 0,
    userId: 123456
}

const chatUsers = [
    {
        nickname: "芜湖",
        avatar: "https://raw.githubusercontent.com/zone-1614/pic/main/img/20220502202202.png",
        userId: 12345611
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1111111
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 123456123
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12345655235
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12345656
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 123456345345
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1113321111
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 127983456123
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 123478935
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12345656
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12367845
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 11097
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1231923
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 16955235
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 127456
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 13234554
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1451
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 123345
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1234565890
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1123056
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 107835345
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 112395111
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 23053456123
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 56655235
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 660945656
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 566345345
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 116781
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1232343
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 123476535
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12343453
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12378943545345
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1078
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 1232343
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 109855
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 12347854
    },
    {
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage(),
        userId: 120987345
    },

]