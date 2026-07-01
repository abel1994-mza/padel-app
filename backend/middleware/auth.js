import jwt from 'jsonwebtoken'



const verificarToken = (req, res, next) => {
  const authorization = req.headers['authorization']

  if (!authorization) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  const token = authorization.replace('Bearer ', '')

  const decoded = jwt.verify(token, 'secreto123')
  req.usuario = decoded

  next()
}
export default verificarToken