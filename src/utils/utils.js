export function getPageURL() {
	return window.location.href;
}

export function getPageName() {
	let pageName = ''
	let URL = window.location.href
	let path = URL.split('/')[3]

	if (path.includes('?')) {
		pageName = path.substring(0, path.indexOf('?'))
	} else {
		pageName = path
	}

	return pageName
}

export const getPageQueries = (url) => {
	const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
	let params = {};

	for(let i = 0; i < arr.length; i += 2){
	  const key = arr[i], value = arr[i + 1];
	  params[key] = value ; // build the object = { limit: "10", page:"1", status:"APPROVED" }
	}

	return params;
	};

export const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export default {
	getPageURL,
	getPageName,
	getPageQueries,
	isMobile
}
