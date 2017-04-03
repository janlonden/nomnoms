import req from 'axios'

const request = (handler, payload) => new Promise ((resolve, reject) => {
  req.post('/api', {handler, ... payload})
    .then(res => {
      const {status, payload} = res.data

      resolve({status, payload})
    })

    .catch(() => {
      resolve({
        status: 'error',
        payload: {
          message: 'Offline or server problems.'
        }
      })
    })
})

export default request
