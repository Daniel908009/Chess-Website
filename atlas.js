const continent = document.getElementById('continent');
const order = document.getElementById('order');
const reverseOrder = document.getElementById('reverseOrder');
const modal = new bootstrap.Modal(document.getElementById('windowCountry'));
const modalBody = document.getElementById("modal-body-content");

function orderCountries(countries) {
    let t = order.value;
    if (t === "name") {
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (t === "population") {
        countries.sort((a, b) => a.population - b.population);
        countries.reverse();
    } else if (t === "area") {
        countries.sort((a, b) => a.area - b.area);
        countries.reverse();
    }
    if (reverseOrder.checked) {
        countries.reverse();
    }
    return countries;
}

function spaceNumber(number) {
    let str = number.toString();
    let result = '';
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        result = str[i] + result;
        count++;
        if (count % 3 === 0 && i !== 0) {
            result = ' ' + result;
        }
    }
    return result;
}

async function getData(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      let blocks = '';
      let ordered = orderCountries(json);
      console.log("new order", ordered);
      ordered.forEach((country) => {
        let population = spaceNumber(country.population);
        blocks += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 pt-3">                
                <div class="card">
                    <img class="card-img-top" src="${country.flags.png}" alt="Vlajka">
                    <div class="card-body">
                      <h4 class="card-title">${country.name.common}</h4>
                      <p class="card-text">Počet obyvatel: ${population}</p>
                      <button class="btn btn-info card-link" 
                      data-name="${country.name.common}">Informace</button>
                    </div>
                </div>
            </div>            
        `;
      });
      listCountries.innerHTML = blocks;
      document.querySelectorAll('[data-name]').forEach(button => {
        button.addEventListener('click', () => {
          //console.log('pokus o');
          const countryName = button.getAttribute('data-name');
          fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then(res => res.json())
          .then(data => {
            //console.log("something here");
            const country = data[0];
            console.log(country);
            document.getElementById("modalName").innerText = country.name.common;
            let population = spaceNumber(country.population);
            let area = spaceNumber(country.area);
            console.log("here");
            let languages = country.languages ? Object.values(country.languages).join(', ') : '';
            let currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : '';
            if (languages === '') {
              languages = 'N/A';
            }
            if (currencies === '') {
              currencies = 'N/A';
            }
            modalBody.innerHTML = `
              <div class="row">
                <div class="col-6">
                  <p>Počet obyvatel: ${population}</p>
                  <p>Rozloha: ${area} km²</p>
                  <p>Hlavní město: ${country.capital ? country.capital[0] : 'N/A'}</p>
                  <p>Jazyk: ${languages}</p>
                  <p>Měna: ${currencies}</p>
                  <p>Region: ${country.region}</p>
                  <p>Subregion: ${country.subregion}</p>
                  <p>Časové pásmo: ${country.timezones.join(', ')}</p>
                </div>
                <div class="col-6 bg-secondary text-center">
                  <img src="${country.flags.png}" alt="Vlajka" class="img-fluid pt-4">
                  <h3 class="text-center text-light">Vlajka</h3>
                </div>
            `;
          modal.show();
          })
          .catch(error => {
            console.log(`Nastala chyba: ${error}`);
          });
        });
      });

    } catch (error) {
      //console.error(error.message);
    }
  }

continent.addEventListener('change', ()=> {
    getData(continent.value);
});
order.addEventListener('change', ()=> {
    getData(continent.value);
});
reverseOrder.addEventListener('change', ()=> {
    getData(continent.value);
});

getData('europe');
