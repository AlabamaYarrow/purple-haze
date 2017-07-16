(function() {
	var width = 0;
	var height = 0;

	var horizonHeight = 50;

	var skyColor = '#171717'; // '#212121';
	var groundColor = '#001155'; // '#001155'; '#000033'; '#4a14bc';
	var hazeColor = '#880e4f';

	var skyHeight =  horizonHeight * 2;

	var horizontalsMargin = 0;

	var frameDuration = 40;

	var speed = 1;

	var initialStep = 8;

	var stepRatio = 1.07;

	function drawSky(ctx) {
		ctx.beginPath();
		ctx.moveTo(0, 0);		
		ctx.fillStyle=skyColor;
		ctx.fillRect(0, 0, width, skyHeight);
		ctx.stroke();
	}

	function drawGround(ctx) {
		ctx.beginPath();		

		var grd=ctx.createLinearGradient(0, skyHeight, 0, height);
		grd.addColorStop(1, groundColor);
		grd.addColorStop(0, skyColor);

		ctx.fillStyle=grd;
		ctx.fillRect(0, skyHeight, width, height);
	}

	function drawHorizon(ctx) {
		ctx.beginPath();

		var horizoneFadeWidth = 13;

		var horizonFadeStartY = skyHeight - horizoneFadeWidth;

		var grd=ctx.createLinearGradient(0, horizonFadeStartY, 0, horizonFadeStartY + horizoneFadeWidth);

		grd.addColorStop(0, skyColor);
		grd.addColorStop(0.75, hazeColor);
		grd.addColorStop(0.85, '#fff');
		grd.addColorStop(1, hazeColor);		

		ctx.fillStyle=grd;
		ctx.fillRect(0, horizonFadeStartY, width, horizoneFadeWidth);
	}

	var iteration = 0;

	var totalIterations = initialStep / speed;

	function drawHorizontals(ctx) {
		var i = 0; 
		var y = skyHeight;
		var step = initialStep; // basic step
		
		ctx.moveTo(0, y);  // horizon line
		ctx.lineTo(width, y);
		ctx.stroke();

		y += horizontalsMargin % step; // first line offset

		if (horizontalsMargin % step == 0) { iteration = 0; }

		for (i = 0; i < 40; i++) {			
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();

			y += step + ( (stepRatio - 1) * step * iteration / totalIterations );
			step *= stepRatio;					
		}
		iteration++;
	}

	function drawVerticals(ctx) {
		var xCenter = width / 2;
		var i = 0; 
		var x = 0;

		var step = 100;
		for (i = 0; i < 100; i++) {
			ctx.moveTo(xCenter, horizonHeight);
			ctx.lineTo(xCenter + x, height);
			ctx.stroke();

			ctx.moveTo(xCenter, horizonHeight);
			ctx.lineTo(xCenter - x, height);
			ctx.stroke();

			step /= 1.02;
			x += step;
		}
	};


	function main () {
		var canvas = $('.canvas')[0];

		width = canvas.width;
		height = canvas.height;

		var ctx = canvas.getContext('2d');

		ctx.strokeStyle = hazeColor;
			
		function drawFrame () {
			ctx.fillStyle=skyColor;
			ctx.fillRect(0, 0, width, height);
			drawGround(ctx);
			drawVerticals(ctx);
			drawHorizontals(ctx);
			drawSky(ctx);
			drawHorizon(ctx);

			setTimeout(function () {				
				horizontalsMargin += speed;
				drawFrame();
			}, frameDuration);
		}

		drawFrame();

	};

	main();
})();

