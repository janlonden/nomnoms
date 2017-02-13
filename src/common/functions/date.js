import moment from 'moment'

moment.locale('sv')

const date = date => moment(date).fromNow()

export default date
