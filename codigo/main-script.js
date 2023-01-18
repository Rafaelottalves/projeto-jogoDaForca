let btnComecar = document.getElementById('btn-começar')

function executar() {
    // Declarações globais
    let blocoMenu = document.getElementById('bloco-menu')
    let containerTempo = document.querySelectorAll('.tempo')
    let containerTema = document.querySelector('#container-tema')
    let containerPalavra = document.querySelector('#container-palavra')

    let inputChute = document.querySelector('#input-chute')
    inputChute.focus()

    let imgForca = document.querySelector('#img-forca')
    let imgBoneco = document.querySelector('#img-boneco')

    let btnChute = document.querySelector('#btn-chute')
    let btnDesistir = document.querySelector('#btn-desistir')

    let container_btnMutar = document.querySelector('div#container-btn_volume')
    let btnMutar = document.querySelector('div#container-btn_volume i')

    let audioTag = document.createElement('audio')

    let cimiterio = document.querySelector('#container-letras_erradas > div')

    let validPalavra = /^[a-zA-ZáéíóúâêîôũàèìòùãẽĩõũÁÉÍÓÚÂÊÎÔŨÀÈÌÒÙÃẼĨÕŨ\s]$/


    let telas = document.querySelector('#telas')

    let containerPerca = document.querySelector('#container-tela')
    let tituloPerca = document.querySelector('div#container-tela h2')
    let txtPerca = document.querySelector('div#container-tela p')
    let imgPerca = document.querySelector('div#container-tela img')
    let btnPerca = document.querySelector('div#container-tela button')

    let blocoMsg = document.querySelector('.bloco-msg-ultima_chance')

    let palavras = [
        {tema: 'Animal', tipo: ['baleia','caranguejo', 'elefante', 'flamingo', 'gato', 'hipopótamo']},
        {tema: 'Pais', tipo: ['Afeganistão', 'Bélgica', 'Brasil', 'Camarões', 'Emirados Árabes Unidos']}
    ]

    let posTema = Math.floor(Math.random() * palavras.length)
    let temaAleatorio = palavras[posTema].tema

    let tipoGeral = palavras[posTema].tipo
    let tipoAleatorio = tipoGeral[Math.floor(Math.random() * tipoGeral.length)].toLowerCase()

    // Execuções
    function presetMsgFim(anim, titulo, txt, img, cor) {
        let anima = anim
        document.querySelector('#palavra-certa').innerHTML = `"${tipoAleatorio}"`

        telas.style.top = '0'
        containerPerca.style.top = '50%'

        tituloPerca.innerHTML = titulo
        txtPerca.innerHTML = txt

        imgPerca.setAttribute('src', img)

        tituloPerca.style.cssText = `${anima} color: ${cor};`
        txtPerca.style.cssText = `${anima} color: ${cor};`
        imgPerca.style.cssText = `${anima}`
        btnPerca.style.cssText = `${anima} background-color: ${cor};`
    }

    function msgUltimaTentativa() {
        blocoMsg.style.cssText = `animation: aparição 4.5s ease-in-out;`

        let containerMsg = document.createElement('div')
        containerMsg.setAttribute('class', 'container-msg')

        let txtultimaChance = document.createElement('p')
        txtultimaChance.innerHTML = 'Você usou todas as suas chances <br> Agora tente acertar a palavra completa'

        containerMsg.appendChild(txtultimaChance)
        blocoMsg.appendChild(containerMsg)
    }

    function msgAviso(msg) {
        let contTelaLetra_errada = document.querySelector('.container-tela-letra_errada')
        let txtAviso = document.querySelector('.container-tela-letra_errada > p')
        txtAviso.innerHTML = msg

        contTelaLetra_errada.removeAttribute('style')

        setTimeout(function() {
            contTelaLetra_errada.style.cssText = `animation: aviso-letra_errada 1.8s ease-in;`
            setTimeout(function() {playAudio(contTelaLetra_errada,'./sons/wrong-2.mp3')}, 300)
        },100)
    }

    let mutarDesmutar = () => {
        if(btnMutar.getAttribute('id') == 'volume-ativo') {
            btnMutar.removeAttribute('id', 'volume-ativo')
            btnMutar.setAttribute('class', 'fa-solid fa-volume-xmark')
        } else {
            btnMutar.setAttribute('id', 'volume-ativo')
            btnMutar.setAttribute('class', 'fa-solid fa-volume-high')
        }
    }
    btnMutar.addEventListener('click', mutarDesmutar)

    function playAudio(elPai, caminho) {
        audioTag.setAttribute('src', caminho)

        if(btnMutar.getAttribute('id') == 'volume-ativo') {
            audioTag.setAttribute('autoplay', 'true')
        } else {
            audioTag.removeAttribute('autoplay', 'true')
        }

        elPai.appendChild(audioTag)
    }

    let transicaoMenu = ((blocoMenu) => {
        blocoMenu.style.top = '-100vh'
    })(blocoMenu)

    let contador = (() => {
        let minuto = 1
        let segundo = 00

        let interval = setInterval(function() {
            segundo--

            if(segundo <= 0) {
                if(minuto > 0) {
                    minuto--
                    segundo = 59
                } else {
                    clearInterval(interval)
                }
            }

            if(minuto < 10) {
                containerTempo[0].innerHTML = 0
                containerTempo[1].innerHTML = minuto
            } else {
                let newMin1 = minuto.toString()[0]
                let newMin2 = minuto.toString()[1]

                containerTempo[0].innerHTML = Number(newMin1)
                containerTempo[1].innerHTML = Number(newMin2)
            }

            if(segundo < 10) {
                containerTempo[2].innerHTML = 0
                containerTempo[3].innerHTML = segundo
            } else {
                let newSec1 = segundo.toString()[0]
                let newSec2 = segundo.toString()[1]

                containerTempo[2].innerHTML = Number(newSec1)
                containerTempo[3].innerHTML = Number(newSec2)
            }

            if(minuto == 0 && segundo == 0) {
                let anima = 'animation: pisca-letra 1.3s cubic-bezier(0.16, 1, 0.3, 1) .5s 2;'
                document.querySelector('#palavra-certa').innerHTML = `"${tipoAleatorio}"`

                telas.style.top = '0'
                containerPerca.style.top = '50%'

                tituloPerca.style.cssText = `${anima}`
                txtPerca.style.cssText = `${anima}`
                imgPerca.style.cssText = `${anima}`
                btnPerca.style.cssText = `${anima}`

                setTimeout(function() {playAudio(containerPerca, './sons/lose-3.mp3')}, 500)
            }
        }, 1000)

        btnPerca.addEventListener('click', function() {
            location.reload()
        })
    })()

    let addTema = (() => {
        let containerTemaAleatorio = document.createElement('p')
        containerTemaAleatorio.innerHTML = temaAleatorio

        containerTema.appendChild(containerTemaAleatorio)
    })()

    let addQuantLetra = (() => {
        for(let pos = 0;pos < tipoAleatorio.length;pos++) {
            let inputLetra = document.createElement('input')

            inputLetra.setAttribute('type', 'text')
            inputLetra.setAttribute('maxlength', '0')

            containerPalavra.appendChild(inputLetra)
        }
    })()

    let listaInput = document.querySelectorAll('#container-palavra > input')
    let next = 0
    let click = 0
    let tentativas = 6

    let validarPalavra = () => {
        let aprov = true
        let msg = 'Palavra não completa'

        for(let input of listaInput){
            if(input.value == '' || input.value == undefined) {
                aprov = false
            } else if(!validPalavra.test(input.value)) {
                aprov = false
                msg = 'Algum caracter invalido'
                input.focus()
            }
        }

        if(aprov == false) {
            msgAviso(msg)

            if(msg == 'Palavra não completa') {
                for(let input of listaInput) {
                    if(input.value == '' || input.value == undefined) {
                        input.focus()
                        break
                    }
                }
            }
        } else {
            click++

            if(click == 1) {
                let palavraJunta = ''

                for(let input of listaInput) {
                    palavraJunta += input.value
                }

                if(palavraJunta == tipoAleatorio) {
                    presetMsgFim('animation: treme-letra .4s ease .5s 3;', 'Você ganhou!', `Parabens!! Você chutou a palavra certa. "${tipoAleatorio}"`, './img/winner-3.png', 'blue')
                    playAudio(containerPerca, './sons/win-3.mp3')
                } else {
                    presetMsgFim('animation: pisca-letra 1.3s cubic-bezier(0.16, 1, 0.3, 1) .5s 2;', 'Você perdeu!', `Você chutou a palavra errada, a palavra certa era "${tipoAleatorio}"`, './img/loser-2.png', 'red')
                    setTimeout(function() {
                        playAudio(containerPerca, './sons/lose-3.mp3')
                    },500)
                }
            }
        }
    }

    let validarChute = () => {
        let palavraChute = inputChute.value.toLowerCase()

        inputChute.value = ''
        inputChute.focus()

        if(validPalavra.test(palavraChute)) {
            let listaLetrasTipo = tipoAleatorio.split('')

            let posPalavraCerta = listaLetrasTipo.indexOf(palavraChute)
            let posPalavraCertaAdd = []

            let confirmLetra = []

            for(let pos = 0;pos < listaLetrasTipo.length;pos++) {
                if(listaLetrasTipo[pos] == palavraChute) {
                    posPalavraCertaAdd.push(pos)
                }
            }

            if(posPalavraCerta != -1) {
                for(let pos = 0;pos < listaLetrasTipo.length;pos++) {
                    for(let item of posPalavraCertaAdd) {
                        if(pos == item) {
                            listaInput[pos].value = palavraChute
                        }
                    }
                }

                for(let item of listaInput) {
                    if(validPalavra.test(item.value)) {
                        confirmLetra.push(item.value)
                    }
                }

                if(confirmLetra.length == listaInput.length) {
                    presetMsgFim('animation: treme-letra .4s ease .5s 3;', 'Você ganhou!', `Parabens!! Você acertou todas as letras de "${tipoAleatorio}"`, './img/winner-3.png', 'blue')
                    playAudio(containerPerca, './sons/win-3.mp3')
                }
            } else {
                next++

                msgAviso('Letra errada')

                let spritesForca = ['spr_forca-1.png', 'spr_forca-2.png', 'spr_forca-3.png', 'spr_forca-4.png', 'spr_forca-5.png', 'spr_forca-6.png'] 
                let sprites = ['sprite-2.png', 'sprite-3.png', 'sprite-4.png', 'sprite-5.png', 'sprite-6.png']

                if(next <= spritesForca.length) {
                    imgForca.src = './img/spr_forca/spr_forca-' + next + '.png'
                }

                if(next < sprites.length+1) {
                    imgBoneco.src = './img/sprites/sprite-' + (next+1) + '.png' //4
                    if(next >= 4 && next <= 6) {
                        imgBoneco.style.width = '23px'
                    }
                } else {
                    imgBoneco.remove()
                }

                if(tentativas > 1) {
                    tentativas--
                } else {
                    msgUltimaTentativa()
                    playAudio(blocoMsg, './sons/plim.mp3')

                    inputChute.setAttribute('disabled', 'true')

                    let posSemLetra
                    
                    for(let pos = 0;pos < listaInput.length;pos++) {
                        if(listaInput[pos].value == '') {
                            listaInput[pos].setAttribute('maxlength', '1')
                        } else {
                            listaInput[pos].addEventListener('focus',function() {
                                listaInput[posSemLetra].focus()
                            })
                        }
                    }

                    for(let pos = 0;pos < listaInput.length;pos++) {
                        if(listaInput[pos].value == '') {
                            posSemLetra = pos
                            break
                        }
                    }
                    listaInput[posSemLetra].focus()

                    btnChute.removeEventListener('click', validarChute)
                    btnChute.addEventListener('click', validarPalavra)
                    btnChute.innerHTML = 'Chutar palavra'
                }

                let contLetra_errada = document.createElement('p')

                if(next == 1) {
                    contLetra_errada.innerHTML += palavraChute
                    cimiterio.appendChild(contLetra_errada)
                } else {
                    let p_letras_erradas = cimiterio.childNodes
                    let conteudoLetras_erradas = []

                    for(let item of p_letras_erradas) {
                        conteudoLetras_erradas.push(item.innerHTML)
                    }

                    if(conteudoLetras_erradas.indexOf(palavraChute) == -1) {
                        contLetra_errada.innerHTML += palavraChute
                        cimiterio.appendChild(contLetra_errada)
                    }
                }
            }
        } else {
            msgAviso('Caractere invalido')
        }
    }
    btnChute.addEventListener('click', validarChute)

    let desistir = () => {
        location.reload()
    }
    btnDesistir.addEventListener('click', desistir)
}

btnComecar.addEventListener('click', executar)
// ver se ja terminou tudo, dar uma arrumada no css ou codigo caso seja necessario e partir pro modelo de cell | botar sons
