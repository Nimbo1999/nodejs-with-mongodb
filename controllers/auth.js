exports.postLogin = (req, res, next) => {
    req.session.teste = true;
    res.send({ ok: 'ok' });
}