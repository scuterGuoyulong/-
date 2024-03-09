import Mock, { Random } from 'mockjs'

export default {
    upload() {
        return "";
    },
    getImg() {
        const n = Random.integer(0, 3);
        var ret = {
            img: []
        };
        for (var i = 0; i < n; i++) {
            ret.img.push(Random.dataImage("125x125", "随便搞张图"));
        }
        return {
            res: ret
        }
    }
}