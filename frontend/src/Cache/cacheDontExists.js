// const cacheDontExist = () => {
//     const result = [];
//     const cache = await caches.open('cache');
//     try {
//         const base_url = 'https://www.countryflags.io';
// 		const opts = { mode: 'no-cors', 'Content-Type': 'image/png' };
// 		const ALPHA_2 = [];
// 		ALPHA_3.forEach((element) => ALPHA_2.push(element.slice(0, -1)));
// 		ALPHA_2.forEach((element) => {
// 			let url = `${base_url}/${element}/flat/32.png`;
// 			fetch(url, opts).then((response) => cache.put(url, response));
//         });
//         return result;
//     } catch (error) {
//         console.log(error)
//     }
// }
// const cacheExist = () => {

// }
// export const cacheHelper = () => {
//     if('caches' in window) {
//         const imageCache = await caches.open('imageCache');
//         if(await imageCache.keys().length === 31) return cacheExist();
//         return cacheDontExist();
//     }
// }
