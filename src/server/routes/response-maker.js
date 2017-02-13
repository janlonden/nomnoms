const responseMaker = (res, status) => payload => {
  res.send({status, payload})
}

export default responseMaker
