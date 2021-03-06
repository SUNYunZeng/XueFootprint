
  var app = app || {}
$(function () {
    lovexhjSitetime();
    const boundaryStyle = {
        fillStyle: 'white',
        strokeStyle: 'transparent'
    }

    const colors = ['#D3F8E2', '#E4C1F9', '#F694C1', '#EDE7B1', '#A9DEF9']

    app.init = function () {
        // module aliases
        const {
            Bodies,
            Body,
            Composite,
            Composites,
            Engine,
            Vector,
            World,
            Common
        } = Matter

        // create an engine
        const engine = Engine.create({
            render: {
                element: document.body,
                options: {
                    height: window.innerHeight,
                    width: window.innerWidth,
                    background: '#2f2980',
                    wireframes: false
                }
            }
        })

        const originY = window.innerHeight / 2
        const originX = window.innerWidth / 2

        const rectTopLeft = Bodies.rectangle(originX, originY, 20, 200, {
            angle: Math.PI / -6,
            render: boundaryStyle,
            isStatic: true
        })

        const rectTopRight = Bodies.rectangle(originX, originY, 20, 200, {
            angle: Math.PI / 6,
            render: boundaryStyle,
            isStatic: true
        })

        const rectTop = Bodies.rectangle(originX, originY, 280, 25, {
            render: boundaryStyle,
            isStatic: true
        })

        const rectBottom = Bodies.rectangle(originX, originY, 280, 25, {
            render: boundaryStyle,
            isStatic: true
        })

        const rectLeft = Bodies.rectangle(originX, originY, 16, 30, {
            render: boundaryStyle,
            isStatic: true
        })
        const rectRight = Bodies.rectangle(originX, originY, 16, 30, {
            render: boundaryStyle,
            isStatic: true
        })

        const rectBottomLeft = Bodies.rectangle(originX, originY, 20, 200, {
            angle: Math.PI / 6,
            render: boundaryStyle,
            isStatic: true
        })

        const rectBottomRight = Bodies.rectangle(originX, originY, 20, 200, {
            angle: Math.PI / -6,
            render: boundaryStyle,
            isStatic: true
        })

        Body.translate(rectTopLeft, Vector.create(-70, -55 * Math.sqrt(3)))
        Body.translate(rectTopRight, Vector.create(70, -55 * Math.sqrt(3)))
        Body.translate(rectTop, Vector.create(0, 100 * Math.sqrt(3) + 10))
        Body.translate(rectBottom, Vector.create(0, -100 * Math.sqrt(3) - 10))
        Body.translate(rectBottomLeft, Vector.create(-70, 55 * Math.sqrt(3)))
        Body.translate(rectBottomRight, Vector.create(70, 55 * Math.sqrt(3)))
        Body.translate(rectLeft, Vector.create(-20, 0))
        Body.translate(rectRight, Vector.create(20, 0))

        const hourglassCompound = Body.create({
            parts: [rectTop, rectTopLeft, rectTopRight, rectLeft, rectRight, rectBottomLeft, rectBottomRight, rectBottom],
            isStatic: true
        })

        const balls = Composites.pyramid(originX, originY, 20, 20, 0, 0, function (x, y) {
            return Bodies.circle(x, y, 5, {
                render: {
                    fillStyle: Common.choose(colors),
                    strokeStyle: 'transparent'
                },
                friction: .09,
                restitution: .15,
                // isStatic: true
            })
        })

        Composite.rotate(balls, Math.PI, Vector.create(originX, originY))
        Composite.translate(balls, Vector.create(94, -40 * Math.sqrt(3)))

        // add all of the bodies to the world
        World.add(engine.world, [hourglassCompound, balls])

        // run the engine
        Engine.run(engine)

        app.flipCanvas = function () {
            const canvas = document.querySelector('canvas')
            canvas.classList.toggle('flip')
            engine.world.gravity.y *= -1
        }
    }
    app.init();
    $(window).resize(function(){
        $('canvas').remove();
        clearInterval(interval);
        app.init();
        interval = setInterval(flip, 6000);
    });
    var interval = setInterval(flip, 6000);
})

function flip(){
    app.flipCanvas();
}

function lovexhjSitetime() {
    window.setTimeout("lovexhjSitetime()", 1000);
    var seconds = 1000
    var minutes = seconds * 60
    var hours = minutes * 60
    var days = hours * 24
    var years = days * 365
    var today = new Date()
    var todayYear = today.getFullYear()
    var todayMonth = today.getMonth() + 1
    var todayDate = today.getDate()
    var todayHour = today.getHours()
    var todayMinute = today.getMinutes()
    var todaySecond = today.getSeconds()
    // ????????????
    var t1 = Date.UTC(2017, 11, 04, 15, 15, 00)
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond)
    var diff = t2 - t1
    var diffYears = Math.floor(diff / years)
    var diffDays = Math.floor((diff / days) - diffYears * 365)
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours)
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes)
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours -
        diffMinutes * minutes) / seconds)
    document.getElementById("lovexhjSitetime").innerHTML = "???????????????" + diffYears + "???" + diffDays + "???" +
        diffHours + "??????" + diffMinutes + "??????" + diffSeconds + "??????";

}