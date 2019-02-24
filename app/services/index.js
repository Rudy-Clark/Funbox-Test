import ymaps from 'ymaps';

// private variables
let map;
function mapInit(idEl, suggestViewElement, options) {
  ymaps
    .load(
      'https://api-maps.yandex.ru/2.1/?apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU&mode=debug'
    )
    .then(yMap => {
      map = new yMap.Map(idEl, options);
      new yMap.SuggestView(suggestViewElement, options);
    })
    .catch(error => {
      console.error(error.message);
    });
}

export { mapInit };
