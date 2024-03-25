
function createCountrySelectList(arr) {
  const selectRef = document.querySelector('#select-country');
  const options = arr.map(({code, name}) => {
    return `<option class="option-country value=${code}>${code}: ${name}</option>`
    
  });
  
  selectRef.insertAdjacentHTML('beforeend', options.join());

}

export default createCountrySelectList ;

