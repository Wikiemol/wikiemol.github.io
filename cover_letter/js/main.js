var willo = {};
/**
 * Asserts that a given object has all of the keys passed in as arguments.
 * Useful for labeling necessary arguments.
 */
willo.assertArgs = function(args) {
    for(var i = 1; i < arguments.length; i++) {
        if(!(arguments[i] in args))
            console.error("Function call requires '" + arguments[i] + "' attribute in argument.");
    }
}


/**
 * Converts an object of the form {r: red, g: green, b: blue}
 * to a string of the form 'rgb(r, g, b)'
 */
willo.colorToString = function(color) {
    willo.assertArgs(color, "r", "g", "b");
    return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
}

/**
 * Creates an information well that opens when your mouse
 * hovers over it.
 */
willo.createInformationWell = function(args) {
    willo.assertArgs(args, "name", "background", "content", "appendTo");
    var fontColor = {"r": 255 - args.background.r, "g": 255 - args.background.g, "b": 255 - args.background.b};
    var infoWell = $(document.createElement('div'))
        .addClass("information-well")
        .css("background", willo.colorToString(args.background))
        .css("padding", "44px")
        .css("margin", "20px")
        .attr("id", args.name);
        

    var header = $(document.createElement('h1'))
        .addClass("text-center")
        .css("color", willo.colorToString(fontColor))
        .html(args.name)
        .attr("id", args.name + "-header");

    var paragraph = $(document.createElement('p'))
        .html(args.content)
        .attr("id", args.name + "-text")
        .css("color", willo.colorToString(fontColor));

    infoWell
        .append(header)
        .append(paragraph)
        .mouseenter(function() {
            //paragraph.show("slow").fadeIn("slow");
            paragraph
                .css("max-height", "200px")
                .css("opacity", "1")
                .css("overflow-y", "hidden")
                .on('transitionEnd webkitTransitionEnd oTransitionEnd', function() {
                    paragraph.css("overflow-y", "auto");
                });
            args.appendTo.css("background", willo.colorToString(args.background));

        })
        .mouseleave(function() {
            //paragraph.hide("slow").fadeOut("slow");
            paragraph
                .css("max-height", "0")
                .css("opacity", "0")
                .css("overflow-y", "hidden");

            args.appendTo.css("background", "#e9ece5");
        });

    args.appendTo.append(infoWell);
    return infoWell;
}

willo.changeAnimationDuration = function(element, duration) {
    element.css("-webkit-animation-duration", duration);
    element.css("-moz-animation-duration", duration);
    element.css("-o-animation-duration", duration);
    element.css("-ms-animation-duration", duration);
    element.css("animation-duration", duration);
    return element;
}
willo.changeAnimationDelay = function(element, delay) {
    element.css("-webkit-animation-delay", delay);
    element.css("-moz-animation-delay", delay);
    element.css("-o-animation-delay", delay);
    element.css("-ms-animation-delay", delay);
    element.css("animation-delay", delay);
    return element;
}

/**
 * Displays the information wells
 */
willo.displayInfo = function() {
    var whoAmI = "I am a full stack software developer, mathematician, and graphic designer with the ability to build fast, effective, and scalable websites. I have 5+ years experience in web development technologies, such as JavaScript, HTML5, and CSS. Most importantly, I am someone who strives to be your next web developer.";

    var whyHire = "I am a passionate worker who loves to build things that ship. I write clean, readable code, and build clean, readable websites. When it comes to development and design, I pay very close attention to the little things. ";


    var contact = "<div class='text-center'>" +
                    "It can't hurt" +
                  "</div>" +
                  "<div class='text-center'>" +
                      "<a target='_blank' href='https://github.com/Wikiemol'><img src='res/github10.png'></a>" + 
                      "<a href='mailto:kingweko@gmail.com'><img src='res/logotype181.png'></a>" +
                      "<a target='_blank' href='https://drive.google.com/file/d/0B-0IlKCrjxd4UjB1elB4ai11VEU/view?usp=sharing'><img src='res/attach10.png'></a>" +
                  "</div>";

    willo.createInformationWell({
         "name": "Who am I?", 
         "background": {"r": 0xb3, "g": 0xc2, "b": 0xbf},
         "fontcolor": "#666666",
         "content": whoAmI,
         "appendTo": $("body")
    }).addClass("animated fadeIn");

    willo.createInformationWell({
         "name": "Why should you hire me?", 
         "background": {"r": 0x3b, "g": 0x3a, "b": 0x36},
         "fontcolor": "#666666",
         "content": whyHire,
         "appendTo": $("body")
    }).addClass("animated fadeIn");

    willo.createInformationWell({
         "name": "Contact Me", 
         "background": {"r": 0xb3, "g": 0xa3, "b": 0x63},
         "fontcolor": "#666666",
         "content": contact,
         "appendTo": $("body")
    }).addClass("animated fadeIn");
}
willo.changeFontSize = function() {
    console.log("hii");
    if(window.innerWidth < 400)
        $("p").css("font-size", "35px");
    else
        $("p").css("font-size", "22px");
}

window.onload = function() {
    console.log("load");
    $(window).resize(function () {
        willo.changeFontSize();
    });
    $("#title-text").addClass("animated fadeIn");
    $("#title-next")
        .addClass("animated fadeIn")
        .click(function() {
            willo.changeAnimationDuration(willo.changeAnimationDelay($("#title-next"), "0s"), "1s")
                .addClass("animated fadeOut")
                .hide("slow");
            $("#title").css("min-height", "0px").css("margin-bottom", "20px");
            willo.displayInfo();
            willo.changeFontSize();
        });
};
