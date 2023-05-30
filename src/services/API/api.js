
function Api(){
  const URL = 'https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=70219de2e06b5997eba9c343b9a368a2&hash='
  const hash = JSON.parse(import.meta.env.VITE_API_HASH)
  const petition = `${URL}${hash}`

  fetch(petition)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Aquí puedes hacer algo con los datos recibidos
    })
    .catch(error => {
      console.error(error);
    })                       
}

export {Api}