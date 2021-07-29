const notes = document.querySelector('.btn-notes')
const letters = document.querySelector('.btn-letters')
const keys = document.querySelectorAll('.piano-key')

const playNote = (audio, key) => {
    key.classList.add('active')
    if (!audio) return
    audio.currentTime = 0
    audio.play()
}

notes.addEventListener('click', () => {
    if (notes.classList.contains('btn-active')) {
        notes.classList.remove('btn-active')
        letters.classList.add('btn-active')
        keys.forEach(key => {
            key.classList.add('letter')
        })
    } else {
        letters.classList.remove('btn-active')
        keys.forEach(key => {
            key.classList.remove('letter')
        })
        notes.classList.add('btn-active')
    }
})

letters.addEventListener('click', () => {
    if (notes.classList.contains('btn-active')) {
        notes.classList.remove('btn-active')
        letters.classList.add('btn-active')
        keys.forEach(key => {
            key.classList.add('letter')
        })
    } else {
        letters.classList.remove('btn-active')
        notes.classList.add('btn-active')
        keys.forEach(key => {
            key.classList.remove('letter')
        })
    }
})


let press = false
window.addEventListener('keydown', (e) => {
    if (press) return
    press = true
    const audio = document.querySelector(`audio[data-note="${e.code}"]`)
    const key = document.querySelector(`.piano-key[id="${e.code}"]`)
    playNote(audio, key)

});

window.addEventListener('keyup', (e) => {
    press = false
    const key = document.querySelector(`.piano-key[id="${e.code}"]`)
    key.classList.remove('active')
});


function mouseOver(e) {
    const audio = document.getElementById(e.target.dataset.letter)
    playNote(audio, e.target)
}

function mouseOut(e) {
    e.target.classList.remove('active')
}
const PlayMouseOverAndOut = (e) => {
    if (e.which === 1) {
        if (e.target.classList.contains("piano-key")) {
            const audio = document.getElementById(e.target.dataset.letter)
            playNote(audio, e.target)
        }

        keys.forEach(key => {
            key.addEventListener("mouseover", mouseOver)
            key.addEventListener("mouseout", mouseOut)
        })
        document.addEventListener('mouseup', StopPlayMouseOverAndOut)
    }
}
const StopPlayMouseOverAndOut = (e) => {
    if (e.which === 1) {
        keys.forEach(key => {
            key.classList.remove("active")
            key.removeEventListener("mouseover", mouseOver)
            key.removeEventListener("mouseout", mouseOut)
        })
        document.addEventListener('mouseup', StopPlayMouseOverAndOut)
    }
}
keys.forEach(key => {
    key.addEventListener('mousedown', PlayMouseOverAndOut)
    key.addEventListener('mouseup', StopPlayMouseOverAndOut)
})

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


