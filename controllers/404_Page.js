const get404Page = (req, res, next) => {
    res.status(404).render('404',{
        docTitle: 'ERROR 404',
        Message: "Oups! ERROR 404 Page Not Found",
        path: '/404'
    })
}
export default get404Page