
$(function() {
	$('#fullpage').fullpage({

		anchors: ['home', 'about', 'skills', 'project', 'contact'],
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['可欣', 'About me', 'What can I do', 'Project & Demo', 'Contact' ],
		verticalCentered: true,
		showActiveTooltip: true,
		afterLoad: function(anchorlink, index) {
			switch(index) {
				case 1: {
					document.getElementById('headimg').className = 'headimg fade-in';
					document.getElementById('s1Title').className = 's1-title f1 scale';
				};break;
				case 2: {
					document.getElementById('s2Title').className = 's2-title f1 fade-in';

				};break;
				case 3: {
					let skillsImg = document.getElementsByClassName('skills-img');
					skillsImg[0].className = 'skills-img rotate';
					skillsImg[1].className = 'skills-img rotate'; 
					skillsImg[2].className = 'skills-img rotate';

					let s3Des = document.getElementsByClassName('s3-des f1')
					s3Des[0].className = 's3-des f1 scale';
					s3Des[1].className = 's3-des f1 scale';
					s3Des[2].className = 's3-des f1 scale';


				};break;
				case 4: {
					let QRcode = document.getElementsByClassName('QRcode-item');
					QRcode[0].className = 'QRcode-item scale';
					QRcode[1].className = 'QRcode-item scale';
					QRcode[2].className = 'QRcode-item scale';

					

				};break;
				case 5: {
					document.getElementsByClassName('public-QRcode')[0].className = 'public-QRcode fade-in';	

				};break;
			}
		},
		onLeave: function(index, nextIndex) {
			switch(index) {
				case 1: {
					
					document.getElementById('headimg').className = 'headimg';
					document.getElementById('s1Title').className = 's1-title f1';
				};break;
				case 2: {
					document.getElementById('s2Title').className = 's2-title f1';

				};break;
				case 3: {
					let skillsImg = document.getElementsByClassName('skills-img');
					skillsImg[0].className = 'skills-img';
					skillsImg[1].className = 'skills-img'; 
					skillsImg[2].className = 'skills-img';

					let s3Des = document.getElementsByClassName('s3-des f1')
					s3Des[0].className = 's3-des f1';
					s3Des[1].className = 's3-des f1';
					s3Des[2].className = 's3-des f1';


				};break;
				case 4: {
					let QRcode = document.getElementsByClassName('QRcode-item');
					QRcode[0].className = 'QRcode-item';
					QRcode[1].className = 'QRcode-item';
					QRcode[2].className = 'QRcode-item';

					

				};break;
				case 5: {
					document.getElementsByClassName('public-QRcode')[0].className = 'public-QRcode';	

				};break;
			}
		}

	});
});

let contactList = document.getElementsByClassName('contact-list')[0];
contactList.addEventListener('click', function(e) {
	e = e || window.event;
	let el = e.srcElement || e.target;
	if(el.className == 'contact-img') {	

		let pClass = el.parentNode.childNodes[2].nextSibling;

		if(pClass.className == 'f6 hide') {
			pClass.className = 'f6 show';
		} else {
			pClass.className = 'f6 hide';
		}
	}
});
