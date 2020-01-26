const faker = require('faker');
var request = require('request');
// eslint-disable-next-line no-unused-expressions
('use strict');
var cloudinary = require('cloudinary').v2;

var photos = ["https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/82627660_2958982357485554_4321829997154140160_o.jpg?_nc_cat=104&_nc_ohc=bdAzRbCEo1wAX88NV7x&_nc_ht=scontent.fopo1-1.fna&oh=bc0e8f13324ff743a424a96cde165e78&oe=5ED88F3F",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/83021708_2958982187485571_1636743909734350848_o.jpg?_nc_cat=106&_nc_ohc=EDPeyeYK1jIAX_clXTI&_nc_ht=scontent.fopo1-1.fna&oh=7cf070146329d08a54fd5a871cb1d6d8&oe=5E8F579B",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/82563790_2958175377566252_4388252838912851968_o.jpg?_nc_cat=100&_nc_ohc=gMtgPZdrJEMAX8WFxYg&_nc_ht=scontent.fopo1-1.fna&oh=dd1d726caa0346ca8ecb957bba8a893e&oe=5ECBCA40",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/82647291_2958175134232943_1134624282500923392_o.jpg?_nc_cat=106&_nc_ohc=CGSgKH4JHckAX-D9KvF&_nc_ht=scontent.fopo1-1.fna&oh=c728e0256c339b52896eee3043ac23f0&oe=5E94CF1C",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/76686318_2823982920985499_7011000100256219136_o.jpg?_nc_cat=104&_nc_ohc=LCiWfW08e9kAX_fjxbp&_nc_ht=scontent.fopo1-1.fna&oh=724c79441269616d031a8f163cc0c704&oe=5E997D30",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/77268942_2818334518217006_5175048035306045440_o.jpg?_nc_cat=104&_nc_ohc=fKwxCtm0h1IAX92ANSg&_nc_ht=scontent.fopo1-1.fna&oh=98b4a998162f5a3e6769c1ce0b65d2d9&oe=5ECCE836",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74680640_2818334451550346_7962481196229722112_o.jpg?_nc_cat=104&_nc_ohc=uWr9aF6nuAsAX8R7U3d&_nc_ht=scontent.fopo1-1.fna&oh=655ae57154ef9891f400416e8bb624ad&oe=5E937FF2",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/75564574_2818327408217717_5650524571653111808_o.jpg?_nc_cat=102&_nc_ohc=vlZSGFk2SUoAX8PGhWv&_nc_ht=scontent.fopo1-1.fna&oh=5a01e62d336df59210a2a735d892c424&oe=5E937D6C",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/78058582_2817280944989030_7933168065909358592_o.jpg?_nc_cat=104&_nc_ohc=8o1k9nd0lTgAX8GV6RQ&_nc_ht=scontent.fopo1-1.fna&oh=8dfd66271d6c56b38eadd7f22b2d3d7f&oe=5E97B59A",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/76603172_2817279004989224_6785041986777776128_o.jpg?_nc_cat=106&_nc_ohc=luxzD1QC2oMAX9FZjVW&_nc_ht=scontent.fopo1-1.fna&oh=460fc27a14371b9450ace7648a809580&oe=5EDAE283",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74477960_2817272481656543_2162761121549778944_o.jpg?_nc_cat=107&_nc_ohc=OqbknDKU8Z0AX8Zw21L&_nc_ht=scontent.fopo1-1.fna&oh=3a097459f5b2996562df1ac63da49565&oe=5ECA07D9",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/p960x960/76762603_2817195761664215_6868503092648738816_o.jpg?_nc_cat=107&_nc_ohc=xnNQFeu267MAX96b_7_&_nc_ht=scontent.fopo1-1.fna&_nc_tp=6&oh=3b45cdcf86fb301fcc1cd5148f6ee687&oe=5E96E0C2",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/75095313_2817177671666024_5223687260032991232_o.jpg?_nc_cat=102&_nc_ohc=l7pvcdSynvcAX9PT-2G&_nc_ht=scontent.fopo1-1.fna&oh=3ccd58b571261f2d94fbd32913a48d5d&oe=5ED49FB0",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/76933184_2782180565165735_5911043196040773632_o.jpg?_nc_cat=107&_nc_ohc=zLptvFSP-UsAX-irjfR&_nc_ht=scontent.fopo1-1.fna&oh=01a2b11e485506ac17448e75d3ae66da&oe=5ED9BF04",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74632410_2782177865166005_167560452472045568_o.jpg?_nc_cat=100&_nc_ohc=fOOkX6UrlWIAX8q9P1r&_nc_ht=scontent.fopo1-1.fna&oh=e00252911232679a1184f9cb3339980c&oe=5EC77178",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/73528723_2782175905166201_7623686410620370944_o.jpg?_nc_cat=107&_nc_ohc=cU4I7v831q4AX-Tsc8W&_nc_ht=scontent.fopo1-1.fna&oh=c0277a16d06fbc60850927d4fe6ead52&oe=5ED23F17",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/73232028_2766808023369656_2267699567866675200_o.jpg?_nc_cat=103&_nc_ohc=LRpsEvyM5fQAX-gwJET&_nc_ht=scontent.fopo1-1.fna&oh=9c5a0e4169c6d5d9250247909558b449&oe=5ED654B6",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/75278253_2754291007954691_8302858063107325952_o.jpg?_nc_cat=105&_nc_ohc=VpukvYMubx8AX8NBWo0&_nc_ht=scontent.fopo1-1.fna&oh=88171625fd3410b74ba928a96916c9a0&oe=5ECCB58D",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/p960x960/73304979_2752288041488321_8248881886248566784_o.jpg?_nc_cat=111&_nc_ohc=vY0BunZ6LJkAX_pZWwk&_nc_ht=scontent.fopo1-1.fna&_nc_tp=6&oh=38486fe26c165626cbe0fa7ea03af118&oe=5E99E1D6",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/72920865_2752287534821705_4157637224243920896_n.jpg?_nc_cat=101&_nc_ohc=Bjt-qKmOKRkAX_RISnT&_nc_ht=scontent.fopo1-1.fna&oh=7a2d0a13680b5479659e97d6960a7088&oe=5EDB7D4E",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/78653163_2838743692842755_3440940725959655424_n.jpg?_nc_cat=111&_nc_ohc=Q2V5TDNcGGEAX81zkCD&_nc_ht=scontent.fopo1-1.fna&oh=164dc7eb3bcb258e386f106a3086663c&oe=5E8DC168",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-0/p640x640/82791277_2958982860818837_4042417124436606976_o.jpg?_nc_cat=108&_nc_ohc=BJttwN_Ch-EAX9JVyra&_nc_ht=scontent.fopo1-1.fna&_nc_tp=6&oh=9e2b0d761eb85edab09aed56f8cdbbd1&oe=5EC881B5",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74893782_2818460358204422_5975563603510558720_o.jpg?_nc_cat=104&_nc_ohc=2SFsN-p5_mAAX8V4Hce&_nc_ht=scontent.fopo1-1.fna&oh=2d05a06513d4e89936d139a612413376&oe=5ECAC3BA",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/78432059_2817274484989676_1081153838041268224_o.jpg?_nc_cat=104&_nc_ohc=paUQi7nYjYYAX-6NF9p&_nc_ht=scontent.fopo1-1.fna&oh=335d7f8a4ffdfdf6f14efb6c46fe7af9&oe=5E9719DF",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/75231845_2780267462023712_355877090316255232_o.jpg?_nc_cat=108&_nc_ohc=HjFP2ySlTTsAX9J53NL&_nc_ht=scontent.fopo1-1.fna&oh=509fe411e91d1f6938dba38cddef3b01&oe=5ED65AE4",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74687751_2767435936640198_863928256364019712_o.jpg?_nc_cat=107&_nc_ohc=_GCkRS3dFPQAX8JII7p&_nc_ht=scontent.fopo1-1.fna&oh=13ed62bd17faa8dca384dd76b043542e&oe=5ED3D57B",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/73217764_2767415873308871_1391489096605499392_o.jpg?_nc_cat=100&_nc_ohc=IP_aUv6wBhgAX-jW6vx&_nc_ht=scontent.fopo1-1.fna&oh=ff4789d312cdb7959e527f714ef5e928&oe=5ED1D956",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/75325929_2767338716649920_5399068826476216320_o.jpg?_nc_cat=106&_nc_ohc=f25smvNXKXwAX8Dpczt&_nc_ht=scontent.fopo1-1.fna&oh=b4fc87d72cc4bc4c12e3df524a1467e4&oe=5E8E601D",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74638378_2766855373364921_7449899926311403520_o.jpg?_nc_cat=100&_nc_ohc=Qy3c7UmphfYAX_BIWgS&_nc_ht=scontent.fopo1-1.fna&oh=db009878e2ade69eabc4c77712f20235&oe=5E9A663F",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t31.0-8/p960x960/17758291_1490002461050225_1700329347596691550_o.jpg?_nc_cat=105&_nc_ohc=G54OaABSgygAX_SegTA&_nc_ht=scontent.fopo1-1.fna&_nc_tp=6&oh=47146f207a83acc57894e4200197f9a1&oe=5E91256C",
	"https://scontent.fopo1-1.fna.fbcdn.net/v/t31.0-8/p960x960/17758602_1489997551050716_2455080962769410173_o.jpg?_nc_cat=108&_nc_ohc=SUf3wAxDnksAX-QiFtD&_nc_ht=scontent.fopo1-1.fna&_nc_tp=6&oh=3efe3ba66eaed0667db80af90ae71795&oe=5EC65425"
	]

cloudinary.config({
	cloud_name: 'dc7hjsttf',
	api_key: '336844426425166',
	api_secret: '2TZg-Y8fDx6EtXZL2vJv61Ymvnk',
});

faker.locale = 'pt_BR';

var doRequest = function (index) {
	var options = {
		url: photos[index],
		method: 'get',
		encoding: null,
		timeout: 5000,
	};

	console.log('Requesting image..');

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (error) {
				console.error('error:', error);
				resolve(reject);
			} else {
				console.log('Image received..');
				resolve(body);
			}
		});
	});
};

exports.createFakePhotos = async (db, sequelize, nr) => {
	const photos = [];

	for (let i = 0; i < nr; i++) {
		//const nrImages = Math.floor(Math.random() * (5 - 1) + 1);
		nrImages = 1;
		for (var j = 0; j < nrImages; j++) {
			value = await doRequest(i);
			photoData = Buffer.from(value).toString('base64');
			var uploadStr = 'data:image/jpeg;base64,' + photoData;

			let result;
			try {
				result = await cloudinary.uploader.upload(uploadStr);
			} catch (e) {
				return next(e);
			}
			const photo = {
				photoData: result.url,
				photoType: 'image/jpeg',
				idPost: i + 1,
			};
			photos.push(photo);
		}
	}

	console.log('Foram criados ' + photos.length + ' fotos.');
	return photos;
};

module.exports = this;
