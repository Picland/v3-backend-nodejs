/**
 * 预定义模式(predefined schema)进行写数据库时的校验
 * 并创建collection
 */

import config from 'config-lite'
import Mongolass from 'mongolass'
import moment from 'moment'
import objectIdToTimestamp from 'objectid-to-timestamp'

const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind (results) {
        results.forEach((item) => {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
        return results
    },
    afterFindOne (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})

// User Collection
let User = mongolass.model('User', {
    phoneNumber: { type: 'string' },
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' },
    email: { type: 'string' }
})
User.createIndex({ phoneNumber: 1 }, { unique: true }).exec() // 根据手机号查找用户，手机号全局唯一

export {
    User
}
