var myToast = (function () {
    return {
        toast: function ({
            title = '',
            message = '',
            type = 'success',
            duration = 300000
        }) {
            const main = document.querySelector('#toast')
            
            var toast = document.createElement('div')
            var delay = duration / 1
            toast.classList.add('toast-msg', `toast-msg--${type}`)
            
            toast.style.animation = `slideInleft ease-in .2s, fadeOut linear  1s ${delay}s forwards`
            
            var icons = {
                success: 'fa fa-thumbs-up',
                warn: 'fa fa-exclamation',
                error: 'fa fa-exclamation',
              
            }
            toast.innerHTML = `<div class="toast-msg__icon">
                                    <i class="${icons[type]}"></i>
                                </div>
                                <div class="toast-msg__body">
                                    <div class="toast-msg__title">${title}</div>
                                    <div class="toast-msg__msg"> ${message}</div>
                                </div>
                                <div class="toast-msg__close">
                                    <i class="fa fa-times"></i>
                                </div>`
            main.appendChild(toast)
            

            var timeOut = setTimeout(function () {
                main.removeChild(toast)
            }, duration + 1000000)

            toast.onclick = function (e) {
                if (e.target.closest('.toast-msg__close')) {
                    main.removeChild(toast)
                    clearTimeout(timeOut)
                }
            }

        }
    }

})(myToast)