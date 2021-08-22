const express = require('expres')
const app = express

app.use(express.json())

let Notes = [
    {
        "id": 1,
        "content": "Debo hacer los deberes de la mejor manera",
        "date": "2020-12-30T17:30:31.0982",
        "important": true
    },
    {
        "id": 2,
        "content": "Para poder aprender",
        "date": "2020-12-30T17:30:31.0982",
        "important": false
    },
    {
        "id": 3,
        "content": "Buen vídeo de node",
        "date": "2020-12-30T17:30:31.0982",
        "important": true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type' : 'application/jsonnp'})
//     response.end(JSON.stringify(Notes))
// })

app.get('/', (request, response)=>{
    response.send('<h1>Hello Universe</h1>')
})

app.get('/api/notes', (request, response)=>{
    response.json(Notes)
})

app.get('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    }else{
        response.status(484).send()
    }
})

app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/api/notes/', (request, response)=>{
    const note = request.body

    if (!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important: false,
        date: new Date().toISOString()
    }
    
    notes = notes.concat(newNote)

    response.status(201).json(note)
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log('Server running on port $(PORT)')
})