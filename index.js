let currentPanel = 0
let scrollBody = $('html, body')
let canScroll = true
let numberPanels
$(document).ready(function() {
    scrollBody.scrollTop(0)
    let panels = $('.panel')
    numberPanels = panels.length
    for (let i = 0; i < numberPanels; i++) {
        let button = $('<button class="scrollMenuButton"></button>')
        button.on('click', function() {
            animateScroll(i)
        })
        $('#scrollMenu').append(button)
    }
    updateScrollMenuButtons()
    $(document).on('wheel touchmove', function(event) {
        let scrollDirection = event.originalEvent.deltaY < 0 ? -1 : 1
        let goingToPanel = currentPanel + scrollDirection
        animateScroll(goingToPanel)

    })
    $(window).on('resize', function(event) {
        scrollBody.scrollTop(scrollHeight())
    })
})
function scrollHeight() {
    return currentPanel * $(window).height()
}
function animateScroll(newCurrentPanel) {
    if (!canScroll || currentPanel === newCurrentPanel || newCurrentPanel < 0 || newCurrentPanel >= numberPanels) return
    currentPanel = newCurrentPanel
    canScroll = false
    scrollBody.animate({scrollTop: scrollHeight()}, 1000, function() {
        canScroll = true
        onScroll()
    })
}
function onScroll() {
    updateScrollMenuButtons()
}
function updateScrollMenuButtons() {
    $('.scrollMenuButton').removeClass('selected')
    $('#scrollMenu').children().eq(currentPanel).addClass('selected')
}