const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const data = require('./article.json')
const fs = require('fs')

app.use(express.static('public'))
app.set('view engine', "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('index', { title: "Home", data: data })
})
app.get('/newarticle', (req, res) => {
    res.render('newarticle', { title: "New Article", data: data.slice(-6) })
})
app.get('/blog', (req, res) => {
    res.render('blog', { title: "Blog", data: data })
})

app.get('/blog/:article', (req, res) => {
    console.log(req.params.article)

    let currentBlog = data.filter(ele =>
        ele.id === Number(req.params.article))
    console.log(currentBlog.length)
    if (currentBlog.length !== 0) {
        res.render('blog', { title: "Blog Article", article: currentBlog[0], data: data.slice(-6) })
    } else {
        res.status(404).render('404', { title: 404 })
    }

})

app.post('/newarticle', (req, res) => {

    data.push({
        id: data.length,
        title: req.body.title,
        author: req.body.author,
        author_bild: req.body.authorPic
    })

    fs.writeFile('./article.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) throw err
        res.redirect('/')
    })

})


// app.use((req, res) => {
//     res.status(404).render('404', { title: 404 })
// })

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
