$(function () {
    let sec = 60;
    let timerInterval;
    let success = true;

    generatePices()

    $('#btnNew').click(function () {
        location.reload(true)
    })

    $('#btnStart').click(function () {
        timerInterval = setInterval(timer, 1000)
        this.disabled = true;
        $('#btnCheck').prop('disabled', false)
        $('.number').draggable({
            revert: "invalid",
            start: function () {
                if ($(this).hasClass("dropDone")) {
                    $(this).removeClass('dropDone');
                    $(this).parent().removeClass('present');
                }
            }
        })
        $('.part').droppable({
            accept: function () {
                return !$(this).hasClass('present')
            },
            drop: function (event, ui) {
                let drag = ui.draggable;
                let drop = $(this);
                drop.addClass('present')
                $(drag).addClass('dropDone').css({
                    top: 0,
                    left: 0,
                    position: 'relative',
                }).appendTo(drop);
            }
        })
    })

    $('#btnCheck').click(function () {
        $("#modal").css('left', (window.innerWidth - ($("#modal").width())) / 2);
        $('.modal-container').css({
            backgroundColor: '#000000c7',
            zIndex: 50
        });
        $("#modal").slideDown(500);
    })

    $('#check').click(checkCorect)

    $("#close").click(function(){
        $("#modal").slideUp(500, function(){
            $('.modal-container').css({
                backgroundColor: '#fff',
                zIndex: -1
            });
        });
    })

    function generatePices() {
        let j = 0;
        let arr = [];
        let flag = true;
        while (j < 16) {
            let elem = Math.floor(Math.random() * 16 + 1);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == elem) {
                    flag = false
                }
            }
            if (flag) {
                arr[j] = elem;
                j++;
            } else {
                flag = true;
            }

        }
        for (let i = 0; i < 16; i++) {
            $(".number").eq(i).addClass(`number${arr[i]}`)
        }

    }

    function checkCorect() {
        let checkArr = $('#end .number');
        if (checkArr.length < 16) {
            success = false;
        }
        if (checkArr.length == 16) {
            for (let i = 0; i < checkArr.length; i++) {
                if (!(checkArr[i].classList[1].includes(`${i+1}`))) {
                    success = false;
                }
            }
        }
        if (success) {
            $('.text').html(`<p>Woohoo, well done, you did it!</p>`)
            $("#modal").css('left', (window.innerWidth - $("#modal").width()) / 2)
            $("#check").css({
                display: 'none'
            })
        } else {
            $('.text').html(`<p>It's a pity, but you lost</p>`)
            $("#modal").css('left', (window.innerWidth - $("#modal").width()) / 2)
            $("#check").css({
                display: 'none'
            })
        }
        $('.number').draggable({
            disabled:true
        })
        clearInterval(timerInterval);
    }


    function timer() {
        sec--;
        if (sec == 0) {
            checkCorect();
            $("#modal").css('left', (window.innerWidth - ($("#modal").width())) / 2);
            $('.modal-container').css({
                backgroundColor: '#000000c7',
                zIndex: 50
            });
            $("#modal").slideDown(500);
        }
        if (sec >= 0 && sec < 10) {
            sec = '0' + sec
        }
        $('.timer').html(`<h2>0:${sec}</h2>`)
        $('.time').html(`<span>0:${sec}</span>`)
    }
})