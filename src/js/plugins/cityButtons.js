import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes.js'

const duration = 600 // Duracao da animacao

function filterByCity(city) { // Filtro da cidade
    $('[wm-city]').each(function(i, e){ // para cada wm-city que encontrar -> passando uma função jqery  com parametro indice e o proprio elemento
        const isTarget = $(this).attr('wm-city') === city || city === null // criando um alvo da manipulação
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)// mostrar a imagem
        }
        else{
            $(this).fadeOut(duration, () =>{
                $(this).parent(duration).addClass('d-none')
            }) // esconder a imagem
        }
    })
}

$.fn.cityButtons = function () {
  
    const cities = new Set // set não tem repeticao
    $('[wm-city]').each(function(i, e){ // para cada elemento 
        cities.add($(e).attr('wm-city'))// Para cada elemento, é adicionada para o elemento cities
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
        btn.click(e => filterByCity(city))
        return btn
    })

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    this.html(btnGroup)
    
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons()
})
