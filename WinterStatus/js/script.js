jQuery(document).ready(function ($) {
  /*setTimeout( function() {
	$('.on').parent().addClass('active');
}, 1500);*/
  var rlPid = "NORMLOW";
  var Pid = rlPid.toLowerCase();
  var rlSerial = "111";
  var rlMkw = "2";

  var Prize = {
    111: {
      1: "1€ en jugadas gratis de casino",
      2: "5€ en jugadas gratis de casino",
      3: "10€ en jugadas gratis de casino",
      4: "50€ en jugadas gratis de casino",
      5: "500€ en jugadas gratis de casino"
    },
    222: {
      1: "10% PBT",
      2: "5€ en apuestas deportivas",
      3: "100% PBT",
      4: "25€ en apuestas deportivas",
      5: "500€ en apuestas deportivas"
    },
    333: {
      1: "1 ticket de torneo",
      2: "Bono de poker de 1€",
      3: "Bono de poker de 5€",
      4: "Bono de poker de 20€",
      5: "Bono de poker de 500€"
    }
  };
  $(".Prize").html(Prize[rlSerial][rlMkw]);

  var ChallengeCasino = {
      normlow: 50,
      normhigh: 100,
      hv: 300,
      vip: 1000
    },
    ChallengeSport = {
      normlow: 30,
      normhigh: 50,
      hv: 100,
      vip: 500
    },
    ChallengePoker = {
      normlow: 10,
      normhigh: 20,
      hv: 100,
      vip: 200
    },
    MinStakes = {
      normlow: "2/5",
      normhigh: "2/5",
      hv: "5/10",
      vip: "10/20"
    },
    Percent01 = {
      normlow: "96.94%",
      normhigh: "87.95%",
      hv: "9.94%",
      vip: "0.00%"
    },
    Percent02 = {
      normlow: "3.00%",
      normhigh: "10.00%",
      hv: "80.00%",
      vip: "0.00%"
    },
    Percent03 = {
      normlow: "0.05%",
      normhigh: "2.00%",
      hv: "10.00%",
      vip: "29.00%"
    },
    Percent04 = {
      normlow: "0.01%",
      normhigh: "0.05%",
      hv: "0.05%",
      vip: "70.00%"
    },
    Percent05 = {
      normlow: "0.001%",
      normhigh: "0.001%",
      hv: "0.01%",
      vip: "1.00%"
    };

  $("#ChallengeCasino").html(ChallengeCasino[Pid]);
  $("#ChallengeSport").html(ChallengeSport[Pid]);
  $("#ChallengePoker").html(ChallengePoker[Pid]);
  $("#MinStakes").html(MinStakes[Pid]);

  $(".Percent01").html(Percent01[Pid]);
  $(".Percent02").html(Percent02[Pid]);
  $(".Percent03").html(Percent03[Pid]);
  $(".Percent04").html(Percent04[Pid]);
  $(".Percent05").html(Percent05[Pid]);

  $(window).load(function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
    var rlAnid = "111111"; // CONST

    var myAnid = rlAnid.toString();

    var items = $(".items");
    var itemList = items.find(".item");
    var currentCard = 0;

    function doneResizing() {
      items.fadeIn();
    }

    if (rlAnid == "111111") {
      $("#win").append("Congratulations, you collected all prizes!");
    }

    var time = 0;
    setTimeout(function () {
      itemList.each(function (i, el) {
        if (myAnid.substr(currentCard, 1) == 1) {
          setTimeout(function () {
            console.log($(el));
            $(el).addClass("active");
          }, time);
          time += 180;
          //howManyCollected++;
        }
        currentCard++;
      });

      setTimeout(function () {
        if (rlAnid == "111111") {
          $("#win").addClass("active");
        }
      }, time + 1500);
    }, 1500);

    //canvas init
    var canvas = document.getElementById("snow");
    var ctx = canvas.getContext("2d");
    var TheSize = 4;
    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    setSize();

    //snowflake particles
    var mp = 25; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * TheSize + 1, //radius
        d: Math.random() * mp //density
      });
    }

    window.addEventListener("resize", function (event) {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      setSize();
    });

    function setSize() {
      if (W < 500) TheSize = 2;
      else TheSize = 4;
    }

    //Lets draw the flakes
    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update() {
      angle += 0.01;
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            //66.67% of the flakes
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
            } else {
              //Enter from the right
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
            }
          }
        }
      }
    }

    //animation loop
    setInterval(draw, 33);
  });

  /* Smoth Scroling */
  $(".goDown").click(function (event) {
    event.preventDefault();
    $(this).fadeOut();
    $("html, body").animate(
      {
        scrollTop: $(this).offset().top
      },
      600
    );
    return false;
  });
});
