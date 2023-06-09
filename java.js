let form = document.querySelector('form')
let container = document.querySelector('.container')
let todos = []

form.onsubmit = (event) => {
    event.preventDefault()

    let todo = {
        id: Math.random(),
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        todo[key] = value
    })

    todos.push(todo)
    reload(todos)
}

function reload(arr) {
    container.innerHTML = ""

    for (let item of arr) {
        let box = document.createElement('div')
        let p = document.createElement('span')
        let span = document.createElement('span')
        let button = document.createElement('button')

        box.classList.add('box')
        p.classList.add('text')
        span.classList.add('op')
        button.innerHTML = "x"
        span.innerHTML = item.time
        p.innerHTML = item.task

        container.append(box)
        box.append(p, span, button)

        button.onclick = () => {
               todos = todos.filter(el => el.id !== item.id)
            box.classList.add('delete-anim')
            setTimeout(() => {
                box.remove()
            }, 500);
        }
        p.onclick = () => {
            if(!item.isDone){
                item.isDone = true
                p.classList.add('active')
            }else {
                item.isDone = false
                p.classList.remove('active')
            }
        }
    }
}